using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class PasswordChangeModel
{
    [Required]
    public string CurrentPassword { get; set; } = null!;
    
    [Required]
    public string NewPassword { get; set; } = null!;
}
