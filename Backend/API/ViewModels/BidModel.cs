using System.Text.Json.Serialization;
using API.Database.Entities;
using API.ViewModels.Converters;

namespace API.ViewModels;

public class BidModel : EntityModel<Guid>
{
    [JsonConverter(typeof(ExpandableConverter<UserViewModel, Guid>))]
    public ExpandableModel<UserViewModel, Guid> Buyer { get; set; }
    
    public decimal Amount { get; set; }
    public DateTime SubmitTime { get; set; }

    public BidModel()
    {
        
    }

    public BidModel(Bid bid)
    {
        this.Key = bid.Key;
        this.Buyer = new ExpandableModel<UserViewModel, Guid>(new UserViewModel(bid.Buyer));
        this.Amount = bid.Amount;
        this.SubmitTime = bid.SubmitTime;
    }
}