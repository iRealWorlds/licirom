namespace API.ViewModels.Requests;

public class TicketShowModel : IExpandOptions
{
    public string[] Expand { get; set; } = Array.Empty<string>();
}