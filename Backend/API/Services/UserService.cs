using API.Database.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Services;

public class UserService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }
    
    public async Task<bool> IsAdminAsync(ApplicationUser user)
    {
        return await _userManager.IsInRoleAsync(user, "Administrator");
    }
}