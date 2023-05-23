using System.Net;
using API.Database;
using API.Database.Entities;
using API.ViewModels;
using API.ViewModels.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PusherServer;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("api/Users/{userKey:guid}/Reviews")]
public class ProfileReviewsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;

    public ProfileReviewsController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    [HttpGet]
    [ActionName(nameof(IndexAsync))]
    [Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<ProfileReviewViewModel>), (int) HttpStatusCode.OK)]
    public async Task<IActionResult> IndexAsync(Guid userKey)
    {
        // Find user
        var user = await this._userManager.FindByIdAsync(userKey.ToString());
        
        // Make sure that the user exists
        if (user == null)
        {
            return NotFound();
        }
        
        // Load reviews
        await _dbContext.Entry(user).Collection(a => a.ReviewsReceived).LoadAsync();
        
        // Get reviews
        var reviews = user.ReviewsReceived.ToList();
        reviews.Sort((a, z) => a.SubmitTime.CompareTo(z.SubmitTime));
        
        // TODO: paginate

        // Return a 200 OK response
        return new JsonResult(reviews.Select(review => new ProfileReviewViewModel(review)));
    }
    
    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(typeof(ProfileReviewViewModel), (int) HttpStatusCode.Created)]
    [ProducesResponseType((int) HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> CreateAsync(ProfileReviewCreateModel request, Guid userKey)
    {
        // Find target user
        var user = await this._userManager.FindByIdAsync(userKey.ToString());
        
        // Make sure that the user exists
        if (user == null)
        {
            return NotFound();
        }
        
        // Get current user's (the reviewer's) details
        var currentUser = await _userManager.GetUserAsync(HttpContext.User);
        if (currentUser == null)
        {
            return Unauthorized();
        }
        
        // Create the review
        var review = new ProfileReview
        {
            Content = request.Content,
            Score = request.Score,
            ReviewerKey = currentUser.Id,
            TargetKey = user.Id
        };
        
        // Persist the comment
        await _dbContext.ProfileReviews.AddAsync(review);
        await _dbContext.SaveChangesAsync();
        
        // TODO: pusher :)
        
        // Return a 201 Created response
        return new JsonResult(new ProfileReviewViewModel(review))
        {
            StatusCode = (int) HttpStatusCode.Created
        };
    }
}
