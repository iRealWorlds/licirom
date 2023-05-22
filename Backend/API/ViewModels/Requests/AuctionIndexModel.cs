namespace API.ViewModels.Requests;

public class AuctionIndexModel : IPaginatedRequestModel, IExpandOptions
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string[] Expand { get; set; } = Array.Empty<string>();
}