using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class UserCreateModel
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }
    
    [Required]
    [EmailAddress]
    public string EmailAddress { get; set; }
    
    [Required]
    public string Password { get; set; }
}