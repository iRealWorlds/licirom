namespace API.ViewModels.Requests;

public class TicketIndexModel : IExpandOptions
{
    public string[] Expand { get; set; } = Array.Empty<string>();
}
