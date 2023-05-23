namespace API.ViewModels.Requests;

public interface IExpandOptions
{
    /// <summary>
    /// Properties that should be expanded in the response.
    /// </summary>
    public string[] Expand { get; set; }
}