using API.Database.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.ViewModels;

public class UserViewModel : EntityModel<Guid>
{
    public string EmailAddress { get; set; } = String.Empty;
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public bool IsAdmin { get; set; } = false;
    
    public UserViewModel()
    {
    }

    public UserViewModel(ApplicationUser user)
    {
        this.Key = user.Id;
        this.FirstName = user.FirstName ?? String.Empty;
        this.LastName = user.LastName ?? String.Empty;
        this.EmailAddress = user.Email ?? String.Empty;
    }
}