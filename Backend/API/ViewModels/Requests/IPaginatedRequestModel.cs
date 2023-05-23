namespace API.ViewModels.Requests;

public interface IPaginatedRequestModel
{
    public int Page { get; set; }
    public int PageSize { get; set; }
}