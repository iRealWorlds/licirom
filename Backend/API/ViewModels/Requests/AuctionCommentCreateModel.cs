using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class AuctionCommentCreateModel
{
    [Required]
    public string Content { get; set; }
}