using System.Text.Json.Serialization;
using API.Database.Entities;
using API.ViewModels.Converters;

namespace API.ViewModels;

public class AuctionModel : EntityModel<Guid>
{
    public string Title { get; set; }
    public string Description { get; set; }

    [JsonConverter(typeof(ExpandableConverter<UserViewModel, Guid>))]
    public ExpandableModel<UserViewModel, Guid> Creator { get; set; }
    
    [JsonConverter(typeof(ExpandableConverter<AuctionCategoryModel, Guid>))]
    public ExpandableModel<AuctionCategoryModel, Guid>? Category { get; set; }
    
    public Auction.Status CurrentStatus { get; set; } = Auction.Status.PENDING;
    public decimal ReservePrice { get; set; }
    public decimal MinimumIncrement { get; set; }
    public decimal StartPrice { get; set; }
    
    [JsonConverter(typeof(IsoDateTimeConverter))]
    public DateTime StartTime { get; set; }
    
    [JsonConverter(typeof(IsoDateTimeConverter))]
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
        this.Category = auction.Category is not null ? new ExpandableModel<AuctionCategoryModel, Guid>(new AuctionCategoryModel(auction.Category)) : null;
        this.CurrentStatus = auction.CurrentStatus;
        this.ReservePrice = auction.ReservePrice;
        this.MinimumIncrement = auction.MinimumIncrement;
        this.StartPrice = auction.StartPrice;
        this.StartTime = auction.StartTime;
        this.EndTime = auction.EndTime;
    }
    
}