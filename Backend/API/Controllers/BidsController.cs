using System.Net;
using API.Database;
using API.Database.Entities;
using API.ViewModels;
using API.ViewModels.Requests;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("api/Auctions/{auctionKey:guid}/Bids")]
public class BidsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly AuctionService _auctionService;

    public BidsController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager, AuctionService auctionService)
    {
        _dbContext = dbContext;
        _userManager = userManager;
        _auctionService = auctionService;
    }

    [HttpGet]
    [ActionName(nameof(IndexAsync))]
    [Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<BidModel>), (int) HttpStatusCode.OK)]
    public async Task<IActionResult> IndexAsync(Guid auctionKey, [FromQuery] BidIndexModel options)
    {
        // Find auction
        var auction = await _dbContext.Auctions.FirstOrDefaultAsync(c => c.Key == auctionKey);
        
        // Make sure that the auction exists
        if (auction == null)
        {
            return NotFound();
        }
        
        // Load bids
        await _dbContext.Entry(auction)
            .Collection(a => a.Bids)
            .Query()
            .Include(b => b.Buyer)
            .LoadAsync();
        
        // Get bids
        var bids = auction.Bids.OrderByDescending(b => b.Amount).ToList();
        
        // Paginate the bids
        var result = new PaginatedResult<Bid>(bids, options).Map(bid =>
        {
            var model = new BidModel(bid);
            foreach (var property in options.Expand)
            {
                model.Expand(property);
            }
            return model;
        });
        
        // Return a 200 OK response
        return new JsonResult(result);
    }
    
    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(typeof(BidModel), (int) HttpStatusCode.Created)]
    [ProducesResponseType((int) HttpStatusCode.BadRequest)]
    [ProducesResponseType((int) HttpStatusCode.NotFound)]
    public async Task<IActionResult> CreateAsync([FromBody] BidCreateModel request, Guid auctionKey)
    {
        // Find auction
        var auction = await _dbContext.Auctions.Include(a => a.Creator).FirstOrDefaultAsync(c => c.Key == auctionKey);
        
        // Make sure that the auction exists
        if (auction == null)
        {
            return NotFound();
        }
        
        // Get current user's details
        var currentUser = await _userManager.GetUserAsync(HttpContext.User);
        if (currentUser == null)
        {
            return Unauthorized();
        }
        
        // Validate auction state
        if(DateTime.UtcNow < auction.StartTime)
        {
            ModelState.AddModelError(nameof(request.Amount), "Cannot bid on an auction that hasn't started.");
            return BadRequest(ModelState);
        }
        if(DateTime.UtcNow > auction.EndTime)
        {
            ModelState.AddModelError(nameof(request.Amount), "Cannot bid on an auction that has ended.");
            return BadRequest(ModelState);
        }
        
        // Validate bid amount
        var minBidAmount = await _auctionService.GetMinimumBidAmount(auction);
        if (request.Amount < minBidAmount)
        {
            ModelState.AddModelError(nameof(request.Amount), "Bid amout must be greater than " + minBidAmount);
            return BadRequest(ModelState);
        }
        
        // Create the bid
        var bid = new Bid
        {
            BuyerKey = currentUser.Id,
            AuctionKey = auction.Key,
            Amount = request.Amount
        };
        
        // Persist the bid
        await _dbContext.Bids.AddAsync(bid);
        await _dbContext.SaveChangesAsync();
        
        // Return a 201 Created response
        return new JsonResult(new BidModel(bid))
        {
            StatusCode = (int) HttpStatusCode.Created
        };
    }
}
