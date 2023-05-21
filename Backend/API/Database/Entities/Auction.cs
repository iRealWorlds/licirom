namespace API.Database.Entities;

public class Auction
{
    public Guid Key { get; set; } = Guid.NewGuid();
    public string Title { get; set; }
    public string? Description { get; set; }
    public Guid CreatorKey { get; set; }
    public Guid? CategoryKey { get; set; }
    public virtual ApplicationUser Creator { get; set; }
    public virtual AuctionCategory? Category { get; set; }
    public virtual ICollection<AuctionComment> Comments { get; set; }
    public virtual ICollection<Bid> Bids { get; set; }
}