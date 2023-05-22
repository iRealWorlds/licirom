using System.Text.Json.Serialization;
using API.Database.Entities;

namespace API.ViewModels;

public class BidModel : EntityModel<Guid>
{
    [JsonConverter(typeof(ExpandableSerializer<UserViewModel, Guid>))]
    public ExpandableModel<UserViewModel, Guid> Buyer { get; set; }
    [JsonConverter(typeof(ExpandableSerializer<UserViewModel, Guid>))]
    public ExpandableModel<AuctionModel, Guid> Auction { get; set; }
    public decimal Amount { get; set; }
    public DateTime SubmitTime { get; set; }

    public BidModel()
    {
        
    }

    public BidModel(Bid bid)
    {
        this.Key = bid.Key;
        this.Buyer = new ExpandableModel<UserViewModel, Guid>(new UserViewModel(bid.Buyer));
        this.Auction = new ExpandableModel<AuctionModel, Guid>(new AuctionModel(bid.Auction));
        this.Amount = bid.Amount;
        this.SubmitTime = bid.SubmitTime;
    }
}