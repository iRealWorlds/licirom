using API.Database.Entities;

namespace API.ViewModels;

public class AuctionCategoryModel
{
    public Guid Key { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public Guid? ParentKey { get; set; }

    public AuctionCategoryModel()
    {
    }

    public AuctionCategoryModel(AuctionCategory category)
    {
        this.Key = category.Key;
        this.Name = category.Name;
        this.Description = category.Description;
        this.ParentKey = category.ParentKey;
    }
}