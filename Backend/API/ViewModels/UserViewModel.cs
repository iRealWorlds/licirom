using API.Database.Entities;

namespace API.ViewModels;

public class UserViewModel
{
    public string EmailAddress { get; set; } = String.Empty;
    
    public UserViewModel()
    {
    }

    public UserViewModel(ApplicationUser user)
    {
        this.EmailAddress = user.Email ?? String.Empty;
    }
}