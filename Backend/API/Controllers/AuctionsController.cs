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
    [ProducesResponseType(typeof(PaginatedResult<AuctionModel>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> IndexAsync([FromQuery] PaginatedRequestModel query)
    {
        // Get current user's details
        var currentUser = await _userManager.GetUserAsync(HttpContext.User);
        if (currentUser == null)
        {
            return Unauthorized();
        }
        
        var auctions = await _dbContext.Auctions
            .Where(a => a.CreatorKey == currentUser.Id || a.CurrentStatus == Auction.Status.ACTIVE || a.CurrentStatus == Auction.Status.ENDED ||
                       a.CurrentStatus == Auction.Status.CLOSED)
            .ToListAsync();
        var result = new PaginatedResult<Auction>(auctions, query).Map(c => new AuctionModel(c));
        return new JsonResult(result);
    }

    [HttpGet("pending")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(PaginatedResult<AuctionModel>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> PendingIndexAsync([FromQuery] PaginatedRequestModel query)
    {
        var auctions = await _dbContext.Auctions.Where(auction => auction.CurrentStatus == Auction.Status.PENDING).ToListAsync();
        var result = new PaginatedResult<Auction>(auctions, query).Map(c => new AuctionModel(c));
        return new JsonResult(result);
    }

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(typeof(AuctionModel), (int)HttpStatusCode.Created)]
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
    [ProducesResponseType(typeof(AuctionModel), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> ShowAsync(Guid auctionKey)
    {
        var auction = await _dbContext.Auctions.FirstOrDefaultAsync(c => c.Key == auctionKey);

        if (auction == null)
        {
            return NotFound();
        }

        return Ok(new AuctionModel(auction));
    }

    [HttpPut("{auctionKey}")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(AuctionModel), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> UpdateAsync(Guid auctionKey, AuctionUpdateModel request)
    {
        // Find auction
        var auction = await _dbContext.Auctions.FirstOrDefaultAsync(c => c.Key == auctionKey);

        // Make sure that the auction exists
        if (auction == null)
        {
            return NotFound();
        }

        // Update the auction's details
        auction.Title = request.Title;
        auction.Description = request.Description;

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