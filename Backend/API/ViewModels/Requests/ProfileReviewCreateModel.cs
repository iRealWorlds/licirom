using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class ProfileReviewCreateModel
{
    [Required]
    public Guid ReviewerId { get; set; }
    [Required]
    public Guid TargetId { get; set; }
    [Required]
    public int Score { get; set; }
    [Required]
    public string Content { get; set; }
}
