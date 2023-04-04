using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class AuthSessionCreateModel
{
    [Required]
    [EmailAddress]
    public string EmailAddress { get; set; }
    
    [Required]
    public string Password { get; set; }
}