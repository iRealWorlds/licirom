using System.ComponentModel.DataAnnotations;
using API.Database.Entities;

namespace API.ViewModels.Requests;

public class AuctionUpdateModel
{
    public string? Title { get; set; } = null;
    public string? Description { get; set; } = null;
    public decimal? ReservePrice { get; set; } = null;
    public decimal? MinimumIncrement { get; set; } = null;
    public decimal? StartPrice { get; set; } = null;
    public DateTime? StartTime { get; set; } = null;
    public DateTime? EndTime { get; set; } = null;
    public Auction.Status? Status { get; set; } = null;
}
