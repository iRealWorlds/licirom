using System.Text.Json;
using API.Database;
using API.Database.Entities;
using API.ViewModels;
using API.ViewModels.Requests;
using API.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _dbContext;
    private readonly IAuthorizationService _authorizationService;

    public TicketsController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager, IAuthorizationService authorizationService)
    {
        this._dbContext = dbContext;
        this._userManager = userManager;
        this._authorizationService = authorizationService;
    }

    [HttpGet]
    public async Task<IActionResult> IndexAsync([FromQuery] TicketIndexModel options)
    {
        var user = await this._userManager.GetUserAsync(HttpContext.User);

        // Handle null user 
        if (user == null)
        {
            return Unauthorized();
        }

        IEnumerable<SupportTicket> ticketList;

        if (await _userManager.IsInRoleAsync(user, "Administrator"))
        {
            ticketList = await this._dbContext.SupportTickets
                .Include(t => t.User)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }
        else
        {
            ticketList = await this._dbContext.SupportTickets
                .Where(t => user.Id == t.UserId)
                .Include(t => t.User)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        // Return the result
        return new JsonResult(ticketList.Select(ticket =>
        {
            var model = new SupportTicketModel(ticket);
            foreach (var property in options.Expand)
            {
                model.Expand(property);
            }
            return model;
        }));
    }



    [HttpPost]
    public async Task<IActionResult> CreateAsync([FromBody] TicketCreateModel data)
    {
        // Get the current user
        var user = await this._userManager.GetUserAsync(HttpContext.User);

        // Handle null user 
        if (user == null)
        {
            return Unauthorized();
        }

        // Create the ticket
        var ticket = new SupportTicket
        {
            Title = data.Title,
            UserId = user.Id
        };

        await this._dbContext.SupportTickets.AddAsync(ticket);
        await this._dbContext.SaveChangesAsync();

        // dd the contenAt as the first ticket message
        var message = new SupportMessage
        {
            MessageContent = data.Content,
            TicketId = ticket.Id,
            UserId = user.Id
        };

        await this._dbContext.SupportMessages.AddAsync(message);
        await this._dbContext.SaveChangesAsync();
        // Return a 201 Created response
        return CreatedAtAction(nameof(ShowAsync), new { key = ticket.Id }, new SupportTicketModel(ticket));

    }

    [HttpGet("{key}")]
    [ActionName(nameof(ShowAsync))]
    public async Task<IActionResult> ShowAsync(int key, [FromQuery] TicketShowModel options)
    {
        // Find the ticket
        var ticket = await this._dbContext.SupportTickets
            .Include(t => t.User)
            .FirstOrDefaultAsync(ticket => ticket.Id == key);

        // Handle no ticket found
        if (ticket == null)
        {
            return NotFound();
        }

        if(!(await _authorizationService.AuthorizeAsync(User, ticket, AuthorizationPolicies.UserOwnsResourceOrIsAdmin)).Succeeded)
        {
            return Unauthorized();
        }
        
        var model = new SupportTicketModel(ticket);
        foreach (var property in options.Expand)
        {
            model.Expand(property);
        }

        // Return the result
        return new JsonResult(model);
    }



    [HttpGet("{key}/all")]
    public async Task<IActionResult> GetAllMessagesForTicketId(int key, [FromQuery] TicketIndexModel options)
    {
        // Retrieve all tickets for the specified ticket ID from the database
        var messages = (await this._dbContext.SupportMessages
            .Where(t => t.TicketId == key)
            .Include(t => t.User)
            .ToListAsync());

        // Return the list of tickets as JSON
        return new JsonResult(messages.Select(m =>
        {
            
            var model = new SupportMessageModel(m);
            foreach (var property in options.Expand)
            {
                model.Expand(property);
            }
            return model;
        }));
    }

    [HttpPost("{key}/addMessage")]
    public async Task<IActionResult> CreateAsync(string key, [FromBody] MessageCreateModel data)
    {
        var user = await this._userManager.GetUserAsync(HttpContext.User);

        // Handle null user 
        if (user == null)
        {
            return Unauthorized();
        }
        int intKey = int.Parse(key);
        var message = new SupportMessage
        {
            MessageContent = data.MessageContent,
            TicketId = intKey,
            UserId = user.Id
        };

        await this._dbContext.SupportMessages.AddAsync(message);
        await this._dbContext.SaveChangesAsync();
        return new JsonResult(message);

    }

    [HttpPut("{key}/resolve")]
    public async Task<IActionResult> ResolveTicket(string key)
    {
        int intKey = int.Parse(key);
        var ticket = await _dbContext.SupportTickets.FindAsync(intKey);
        if (ticket == null)
        {
            return NotFound();
        }

        ticket.Resolved = true; // Set the Resolved property to true
        _dbContext.SupportTickets.Entry(ticket).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("{key}/isResolved")]
    public async Task<IActionResult> isResolved(string key)
    {
        int intKey = int.Parse(key);
        var ticket = await _dbContext.SupportTickets.FindAsync(intKey);
        if (ticket == null)
        {
            return NotFound();
        }
        bool isTicketResolved = ticket.Resolved;
        return Ok(isTicketResolved);
    }

}