using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Database.Entities;
using API.ViewModels;
using API.ViewModels.Requests;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthSessionsController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthSessionsController(UserManager<ApplicationUser> userManager, IConfiguration configuration)
    {
        this._userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        this._configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(typeof(AuthSessionModel), StatusCodes.Status201Created)]
    public async Task<IActionResult> Create([FromBody] AuthSessionCreateModel data)
    {
        // Get the user that matches the e-mail from the request
        var user = await this._userManager.FindByEmailAsync(data.EmailAddress);
        
        // If no user was found, return an error
        if (user == null)
        {
            ModelState.AddModelError(nameof(AuthSessionCreateModel.EmailAddress), "A user with this e-mail address could not be found.");
            return BadRequest(ModelState);
        }
        
        // Check if the password matches the user
        if (!(await _userManager.CheckPasswordAsync(user, data.Password)))
        {
            ModelState.AddModelError(nameof(AuthSessionCreateModel.Password), "A user with this e-mail address and password combination could not be found.");
            return BadRequest(ModelState);
        }
        
        // Build the claims
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };
        claims.AddRange((await this._userManager.GetRolesAsync(user)).Select(role => new Claim(ClaimTypes.Role, role)));
        
        // Build the signing key
        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._configuration["JWT:Secret"]));
        
        // Create the token
        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(3),
            claims: claims,
            signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
        );
        
        // Return a successful response
        return new JsonResult(new AuthSessionModel(new JwtSecurityTokenHandler().WriteToken(token)))
        {
            StatusCode = StatusCodes.Status201Created
        };
    }
}