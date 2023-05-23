using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class MessageCreateModel
{
    [Required]
    public string MessageContent { get; set; }
}