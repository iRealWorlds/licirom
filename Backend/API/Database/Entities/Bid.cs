namespace API.Database.Entities;

public class Bid : IUserOwnable
{
    public Guid Key { get; set; } = Guid.NewGuid();
    public Guid BuyerKey { get; set; }
    public virtual ApplicationUser Buyer { get; set; }
    public Guid AuctionKey { get; set; }
    public virtual Auction Auction { get; set; }
    public decimal Amount { get; set; }
    public DateTime SubmitTime { get; set; } = DateTime.UtcNow;
    
    public Guid GetOwnerId()
    {
        return BuyerKey;
    }
}
