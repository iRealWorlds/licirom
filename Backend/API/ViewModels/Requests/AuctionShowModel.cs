namespace API.ViewModels.Requests;

public class AuctionShowModel : IExpandOptions
{
    public string[] Expand { get; set; } = Array.Empty<string>();
}