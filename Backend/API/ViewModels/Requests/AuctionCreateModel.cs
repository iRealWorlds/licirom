using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class AuctionCreateModel
{
    [Required]
    public string Title { get; set; }
    
    public string? Description { get; set; } = null;
    
    [Required]
    public Guid CategoryKey { get; set; }
    
    [Required]
    public decimal ReservePrice { get; set; }
    
    [Required]
    public decimal MinimumIncrement { get; set; }
    
    [Required]
    public decimal StartPrice { get; set; }
    
    [Required]
    public DateTime StartTime { get; set; }
    
    [Required]
    public DateTime EndTime { get; set; }
}