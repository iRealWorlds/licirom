namespace API.Database.Entities;

public class AuctionCategory
{
    public Guid Key { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public string? Description { get; set; } = null;
    public Guid? ParentKey { get; set; } = null;
    
    public virtual AuctionCategory? Parent { get; set; }
    public virtual ICollection<AuctionCategory> Children { get; set; }
    public virtual ICollection<Auction> Auctions { get; set; }
}