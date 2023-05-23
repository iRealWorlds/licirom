namespace API.ViewModels.Requests;

public class AuctionCategoryIndexModel : IPaginatedRequestModel
{
    public string? Query { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}