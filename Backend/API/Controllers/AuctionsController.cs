using System.Net;
using API.Database;
using API.Database.Entities;
using API.ViewModels;
using API.ViewModels.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AuctionsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuctionsController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType(typeof(PaginatedResult<AuctionModel>), (int) HttpStatusCode.OK)]
    public async Task<IActionResult> IndexAsync([FromQuery] AuctionIndexModel query)
    {
        // Get current user's details
        var currentUser = await _userManager.GetUserAsync(HttpContext.User);
        if (currentUser == null)
        {
            return Unauthorized();
        }

        var auctions = await _dbContext.Auctions
                .Include(a => a.Creator)
            .Where(a => a.CreatorKey == currentUser.Id || a.CurrentStatus == Auction.Status.ACTIVE ||
                        a.CurrentStatus == Auction.Status.ENDED ||
                        a.CurrentStatus == Auction.Status.CLOSED)
            .ToListAsync();
            
        var result = new PaginatedResult<Auction>(auctions, query).Map(delegate(Auction c)
        {
            var model = new AuctionModel(c);
            foreach (var property in query.Expand)
            {
                model.Expand(property);
            }
            return model;
        });
        return new JsonResult(result);
    }

    [HttpGet("pending")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(PaginatedResult<AuctionModel>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> PendingIndexAsync([FromQuery] AuctionIndexModel query)
    {
        var auctions = await _dbContext.Auctions
            .Include(a => a.Creator)
            .Where(auction => auction.CurrentStatus == Auction.Status.PENDING)
            .ToListAsync();
        var result = new PaginatedResult<Auction>(auctions, query).Map(c => new AuctionModel(c));
        return new JsonResult(result);
    }

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(typeof(AuctionModel), (int) HttpStatusCode.Created)]
    public async Task<IActionResult> CreateAsync(AuctionCreateModel request)
    {
        // Make sure category exists
        var exists = await _dbContext.AuctionCategories.AnyAsync(c => c.Key == request.CategoryKey);
        if (!exists)
        {
            ModelState.AddModelError(nameof(request.CategoryKey), "Category does not exist.");
            return BadRequest(ModelState);
        }
        
        // Get current user's details
        var currentUser = await _userManager.GetUserAsync(HttpContext.User);
        if (currentUser == null)
        {
            return Unauthorized();
        }
        
        // Create auction
        var auction = new Auction()
        {
            Title = request.Title,
            Description = request.Description,
            CategoryKey = request.CategoryKey,
            CreatorKey = currentUser.Id,
            ReservePrice = request.ReservePrice,
            MinimumIncrement = request.MinimumIncrement,
            StartPrice = request.StartPrice,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
        };
        
        // Persist the auction
        await _dbContext.Auctions.AddAsync(auction);
        await _dbContext.SaveChangesAsync();
        
        // Return a 201 Created response
        return CreatedAtAction(nameof(ShowAsync), new { auctionKey = auction.Key }, new AuctionModel(auction));
    }

    [HttpGet("{auctionKey}")]
    [ActionName(nameof(ShowAsync))]
    [Produces("application/json")]
    [ProducesResponseType(typeof(AuctionModel), (int) HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> ShowAsync(Guid auctionKey, [FromQuery] AuctionShowModel options)
    {
        var auction = await _dbContext.Auctions.Include(a => a.Creator).FirstOrDefaultAsync(c => c.Key == auctionKey);

        if (auction == null)
        {
            return NotFound();
        }

        var model = new AuctionModel(auction);
       
        foreach (var property in options.Expand)
        {
            model.Expand(property);
        }

        return Ok(model);
    }

    [HttpPatch("{auctionKey}")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(AuctionModel), (int) HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> UpdateAsync(Guid auctionKey, AuctionUpdateModel request)
    {
        // Find auction
        var auction = await _dbContext.Auctions.Include(a => a.Creator).FirstOrDefaultAsync(c => c.Key == auctionKey);
        
        // Make sure that the auction exists
        if (auction is null)
        {
            return NotFound();
        }

        if(request.Title is not null)
        {
            auction.Title = request.Title;
        }

        if(request.Description is not null)
        {
            auction.Description = request.Description;
        }

        if(request.ReservePrice is not null)
        {
            auction.ReservePrice = (decimal) request.ReservePrice;
        }

        if(request.MinimumIncrement is not null)
        {
            auction.MinimumIncrement = (decimal) request.MinimumIncrement;
        }

        if(request.StartPrice is not null)
        {
            if(auction.StartTime < DateTime.UtcNow)
            {
                ModelState.AddModelError(nameof(request.StartPrice), "Start price may only be changed before the auction has started.");
                return BadRequest(ModelState);
            }

            auction.StartPrice = (decimal) request.StartPrice;
        }

        if (request.StartTime is not null)
        {
            if(auction.StartTime < DateTime.UtcNow)
            {
                ModelState.AddModelError(nameof(request.StartTime), "Start time may only be changed before the auction has started.");
                return BadRequest(ModelState);
            }
            if(request.StartTime < DateTime.UtcNow)
            {
                ModelState.AddModelError(nameof(request.StartTime), "Start time must be set in the future.");
                return BadRequest(ModelState);
            }

            auction.StartTime = (DateTime) request.StartTime;
        }

        if(request.EndTime is not null)
        {
            if(request.EndTime < auction.StartTime)
            {
                ModelState.AddModelError(nameof(request.EndTime), "End time must be after the start time.");
                return BadRequest(ModelState);
            }
            auction.EndTime = (DateTime) request.EndTime;
        }
        
        // Save changes
        _dbContext.Auctions.Entry(auction).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        
        // Return the updated result
        return Ok(new AuctionModel(auction));
    }

    [HttpDelete("{auctionKey}")]
    [ActionName(nameof(ShowAsync))]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.NoContent)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> DeleteAsync(Guid auctionKey)
    {
        // Get auction details
        var auction = await _dbContext.Auctions.FirstOrDefaultAsync(c => c.Key == auctionKey);

        // Make sure the auction exists
        if (auction == null)
        {
            return NotFound();
        }
        
        // Delete the auction
        _dbContext.Entry(auction).State = EntityState.Deleted;
        await _dbContext.SaveChangesAsync();
        
        // Return a 204 No Content response
        return NoContent();
    }

    [HttpPut("{auctionKey}/activate")]
    public async Task<IActionResult> Activate(string auctionKey)
    {
        var guidAuctionKey = Guid.Parse(auctionKey);
        // Get auction details
        var auction = await _dbContext.Auctions.FirstOrDefaultAsync(c => c.Key == guidAuctionKey);

        // Make sure the auction exists
        if (auction == null)
        {
            return NotFound();
        }

        // Activate the auction
        auction.CurrentStatus = Auction.Status.ACTIVE;
        _dbContext.Entry(auction).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

}