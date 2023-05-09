using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class AuctionCategoryUpdateModel
{
    [Required]
    public string Name { get; set; }
    
    public string? Description { get; set; } = null;
    
    public Guid? ParentKey { get; set; } = null;   
}