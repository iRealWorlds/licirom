namespace API.ViewModels.Requests;

public class AuctionCategoryIndexModel : IPaginatedRequestModel
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}