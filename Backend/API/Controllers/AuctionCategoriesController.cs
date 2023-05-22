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
public class AuctionCategoriesController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuctionCategoriesController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType(typeof(PaginatedResult<AuctionCategoryModel>), (int) HttpStatusCode.OK)]
    public async Task<IActionResult> IndexAsync([FromQuery] AuctionCategoryIndexModel options)
    {
        var categories = await _dbContext.AuctionCategories.ToListAsync();
        if (!string.IsNullOrWhiteSpace(options.Query))
        {
            categories = categories.Where(c => c.Name.ToLowerInvariant().StartsWith(options.Query.ToLowerInvariant())).ToList();
        }
        
        var result = new PaginatedResult<AuctionCategory>(categories, options).Map(c => new AuctionCategoryModel(c));
        return new JsonResult(result);
    }

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(typeof(AuctionCategoryModel), (int) HttpStatusCode.Created)]
    public async Task<IActionResult> CreateAsync(AuctionCategoryCreateModel request)
    {
        // Make sure parent category exists
        if (request.ParentKey != null)
        {
            var exists = await _dbContext.AuctionCategories.AnyAsync(c => c.Key == request.ParentKey);
            if (!exists)
            {
                ModelState.AddModelError(nameof(request.ParentKey), "Parent category does not exist.");
                return BadRequest(ModelState);
            }
        }
        
        // Create category
        var category = new AuctionCategory()
        {
            Name = request.Name,
            Description = request.Description,
            ParentKey = request.ParentKey,
        };
        
        // Persist the category
        await _dbContext.AuctionCategories.AddAsync(category);
        await _dbContext.SaveChangesAsync();
        
        // Return a 201 Created response
        return CreatedAtAction(nameof(ShowAsync), new { categoryKey = category.Key }, new AuctionCategoryModel(category));
    }

    [HttpGet("{categoryKey}")]
    [ActionName(nameof(ShowAsync))]
    [Produces("application/json")]
    [ProducesResponseType(typeof(AuctionCategoryModel), (int) HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> ShowAsync(Guid categoryKey)
    {
        var category = await _dbContext.AuctionCategories.FirstOrDefaultAsync(c => c.Key == categoryKey);

        if (category == null)
        {
            return NotFound();
        }

        return Ok(new AuctionCategoryModel(category));
    }

    [HttpPut("{categoryKey}")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(AuctionCategoryModel), (int) HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> UpdateAsync(Guid categoryKey, AuctionCategoryUpdateModel request)
    {
        // Find category
        var category = await _dbContext.AuctionCategories.FirstOrDefaultAsync(c => c.Key == categoryKey);
        
        // Make sure that the category exists
        if (category == null)
        {
            return NotFound();
        }
        
        // Make sure parent category exists
        if (request.ParentKey != null)
        {
            var exists = await _dbContext.AuctionCategories.AnyAsync(c => c.Key == request.ParentKey);
            if (!exists)
            {
                ModelState.AddModelError(nameof(request.ParentKey), "Parent category does not exist.");
                return BadRequest(ModelState);
            }
        }
        
        // Update the category's details
        category.Name = request.Name;
        category.Description = request.Description;
        category.ParentKey = request.ParentKey;
        
        // Save changes
        _dbContext.AuctionCategories.Entry(category).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        
        // Return the updated result
        return Ok(new AuctionCategoryModel(category));
    }

    [HttpDelete("{categoryKey}")]
    [ActionName(nameof(ShowAsync))]
    [Produces("application/json")]
    [ProducesResponseType((int)HttpStatusCode.NoContent)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> DeleteAsync(Guid categoryKey)
    {
        // Get category details
        var category = await _dbContext.AuctionCategories.FirstOrDefaultAsync(c => c.Key == categoryKey);

        // Make sure the category exists
        if (category == null)
        {
            return NotFound();
        }
        
        // Update child categories' parent
        var children = await _dbContext.AuctionCategories.Where(c => c.ParentKey == category.Key).ToListAsync();
        foreach (var child in children)
        {
            child.ParentKey = category.ParentKey;
            _dbContext.Entry(child).State = EntityState.Modified;
        }
        
        // Delete the category
        _dbContext.Entry(category).State = EntityState.Deleted;
        await _dbContext.SaveChangesAsync();
        
        // Return a 204 No Content response
        return NoContent();
    }
}