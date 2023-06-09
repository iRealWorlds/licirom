namespace API.Database.Entities;

public class Auction : IUserOwnable
{
    public enum Status
    {
        PENDING, ACTIVE, ENDED, CLOSED
    }

    public Guid Key { get; set; } = Guid.NewGuid();
    public string Title { get; set; }
    public string? Description { get; set; }
    public Guid CreatorKey { get; set; }
    public Guid? CategoryKey { get; set; }
    public decimal ReservePrice { get; set; } = 0;
    public decimal MinimumIncrement { get; set; } = 0;
    public decimal StartPrice { get; set; } = 0;
    public DateTime StartTime { get; set; } = DateTime.UtcNow;
    public DateTime EndTime { get; set; }
    public Status CurrentStatus { get; set; } = Auction.Status.PENDING;
    
    public virtual ApplicationUser Creator { get; set; }
    public virtual AuctionCategory? Category { get; set; }
    public virtual ICollection<AuctionComment> Comments { get; set; }
    public virtual ICollection<Bid> Bids { get; set; }

    public Guid GetOwnerId()
    {
        return CreatorKey;
    }
}