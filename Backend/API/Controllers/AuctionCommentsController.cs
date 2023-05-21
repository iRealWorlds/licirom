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
[Route("api/Auctions/{auctionKey:guid}/Comments")]
public class AuctionCommentsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuctionCommentsController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    [HttpGet]
    [ActionName(nameof(IndexAsync))]
    [Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<AuctionCommentModel>), (int) HttpStatusCode.Created)]
    public async Task<IActionResult> IndexAsync(Guid auctionKey)
    {
        // Find auction
        var auction = await _dbContext.Auctions.FirstOrDefaultAsync(c => c.Key == auctionKey);
        
        // Make sure that the auction exists
        if (auction == null)
        {
            return NotFound();
        }
        
        // Load comments
        await _dbContext.Entry(auction).Collection(a => a.Comments).LoadAsync();
        
        // Get comments
        var comments = auction.Comments.ToList();
        comments.Sort((a, z) => a.SubmitTime.CompareTo(z.SubmitTime));
        
        // Return a 200 OK response
        return new JsonResult(comments.Select(comment => new AuctionCommentModel(comment)));
    }
    
    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(typeof(AuctionCommentModel), (int) HttpStatusCode.Created)]
    [ProducesResponseType((int) HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> CreateAsync(AuctionCommentCreateModel request, Guid auctionKey)
    {
        // Find auction
        var auction = await _dbContext.Auctions.FirstOrDefaultAsync(c => c.Key == auctionKey);
        
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
        
        // Create the comment
        var comment = new AuctionComment
        {
            Content = request.Content,
            AuthorKey = currentUser.Id,
            AuctionKey = auction.Key,
        };
        
        // Persist the comment
        await _dbContext.AuctionComments.AddAsync(comment);
        await _dbContext.SaveChangesAsync();
        
        // Return a 201 Created response
        return new JsonResult(new AuctionCommentModel(comment))
        {
            StatusCode = (int) HttpStatusCode.Created
        };
    }
}