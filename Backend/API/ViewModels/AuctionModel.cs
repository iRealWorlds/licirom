using API.Database.Entities;

namespace API.ViewModels;

public class AuctionModel
{
    public Guid Key { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Guid CreatorKey { get; set; }
    public Guid? CategoryKey { get; set; }
    
    public AuctionModel()
    {
        
    }

    public AuctionModel(Auction auction)
    {
        this.Key = auction.Key;
        this.Title = auction.Title;
        this.Description = auction.Description;
        this.CreatorKey = auction.CreatorKey;
        this.CategoryKey = auction.CategoryKey;
    }
    
}