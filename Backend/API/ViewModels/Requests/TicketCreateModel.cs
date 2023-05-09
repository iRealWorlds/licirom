using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class TicketCreateModel
{
    [Required]
    public string Title {get; set;}

    [Required]
    public string Content {get; set;}
}