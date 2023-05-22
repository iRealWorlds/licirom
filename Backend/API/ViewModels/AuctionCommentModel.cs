using API.Database.Entities;

namespace API.ViewModels;

public class AuctionCommentModel
{
    public Guid Key { get; set; }
    public Guid AuthorKey { get; set; }
    public Guid AuctionKey { get; set; }
    public string Content { get; set; }
    public DateTime SubmitTime { get; set; }
    
    public AuctionCommentModel()
    {
        
    }

    public AuctionCommentModel(AuctionComment comment)
    {
        this.Key = comment.Key;
        this.AuthorKey = comment.AuthorKey;
        this.AuctionKey = comment.AuctionKey;
        this.Content = comment.Content;
        this.SubmitTime = comment.SubmitTime;
    }
}