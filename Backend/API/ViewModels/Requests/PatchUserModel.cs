using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class PatchUserModel
{
    [Required]
    public string FirstName { get; set; } = null!;
    
    [Required]
    public string LastName { get; set; } = null!;
}
