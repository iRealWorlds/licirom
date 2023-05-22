using System.Text.Json.Serialization;
using API.Database.Entities;

namespace API.ViewModels;

public class AuctionModel : EntityModel<Guid>
{
    public string Title { get; set; }
    public string Description { get; set; }

    [JsonConverter(typeof(ExpandableSerializer<UserViewModel, Guid>))]
    public ExpandableModel<UserViewModel, Guid> Creator { get; set; }
    
    public Guid? CategoryKey { get; set; }
    public Auction.Status CurrentStatus { get; set; } = Auction.Status.PENDING;
    public decimal ReservePrice { get; set; }
    public decimal MinimumIncrement { get; set; }
    public decimal StartPrice { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public AuctionModel()
    {
        
    }

    public AuctionModel(Auction auction)
    {
        this.Key = auction.Key;
        this.Title = auction.Title;
        this.Description = auction.Description ?? String.Empty;
        this.Creator = new ExpandableModel<UserViewModel, Guid>(new UserViewModel(auction.Creator));
        this.CategoryKey = auction.CategoryKey;
        this.CurrentStatus = auction.CurrentStatus;
        this.ReservePrice = auction.ReservePrice;
        this.MinimumIncrement = auction.MinimumIncrement;
        this.StartPrice = auction.StartPrice;
        this.StartTime = auction.StartTime;
        this.EndTime = auction.EndTime;
    }
    
}