using API.Database.Entities;
using API.ViewModels;
using API.ViewModels.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    
    public UsersController(UserManager<ApplicationUser> userManager)
    {
        this._userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
    }

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(typeof(UserViewModel), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateAsync([FromBody] UserCreateModel data)
    {
        // Check that a user with the given e-mail address doesn't already exist
        var existingUser = await _userManager.FindByEmailAsync(data.EmailAddress);
        if (existingUser != null)
        {
            ModelState.AddModelError(nameof(UserCreateModel.EmailAddress), "The e-mail address must be unique.");
            return BadRequest(ModelState);
        }
        
        // Create the new user
        var user = new ApplicationUser
        {
            FirstName = data.FirstName,
            LastName = data.LastName,
            Email = data.EmailAddress,
            UserName = data.EmailAddress,
            SecurityStamp = Guid.NewGuid().ToString(),
        };
        
        // Add the user to the manager
        var result = await _userManager.CreateAsync(user, data.Password);

        // If the creation fails, throw an error
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("*", error.Description);
            }
            return BadRequest(ModelState);
        }
        
        // Return a 201 Created response
        return CreatedAtAction(nameof(ShowAsync), new { userKey = user.Id }, new UserViewModel(user));
    }

    [HttpGet("{userKey:guid}")]
    [ActionName(nameof(ShowAsync))]
    [Produces("application/json")]
    [ProducesResponseType(typeof(UserViewModel), StatusCodes.Status200OK)]
    [Authorize]
    public async Task<IActionResult> ShowAsync(Guid userKey)
    {
        // Find the user
        var user = await this._userManager.FindByIdAsync(userKey.ToString());

        // If none found, return a 404 response
        if (user == null)
        {
            return new NotFoundResult();
        }

        // Otherwise, return the user's details
        return new JsonResult(new UserViewModel(user));
    }

    [HttpPut("{userKey:guid}/password")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [Authorize]
    public async Task<IActionResult> ChangePasswordAsync([FromBody] PasswordChangeModel data, Guid userKey)
    {
        var user = await this._userManager.FindByIdAsync(userKey.ToString());

        if (user == null)
        {
            return new NotFoundResult();
        }

        if(!(await this._userManager.ChangePasswordAsync(user, data.CurrentPassword, data.NewPassword)).Succeeded)
        {
            return new UnprocessableEntityResult();
        }

        return new NoContentResult();
    }

}