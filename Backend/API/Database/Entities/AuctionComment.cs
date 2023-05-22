namespace API.Database.Entities;

public class AuctionComment
{
    public Guid Key { get; set; } = Guid.NewGuid();
    public Guid AuthorKey { get; set; }
    public virtual ApplicationUser Author { get; set; }
    public Guid AuctionKey { get; set; }
    public virtual Auction Auction { get; set; }
    public string Content { get; set; }
    public DateTime SubmitTime { get; set; } = DateTime.UtcNow;
}
