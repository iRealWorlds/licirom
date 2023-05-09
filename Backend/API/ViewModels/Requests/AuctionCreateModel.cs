using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class AuctionCreateModel
{
    [Required]
    public string Title { get; set; }
    
    public string? Description { get; set; } = null;
    
    [Required]
    public Guid CategoryKey { get; set; }
}