using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class AuctionUpdateModel
{
    [Required]
    public string Title { get; set; }
    
    public string? Description { get; set; } = null;
}