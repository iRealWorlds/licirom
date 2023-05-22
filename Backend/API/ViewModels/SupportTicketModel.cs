using System.Text.Json.Serialization;
using API.Database.Entities;

namespace API.ViewModels;

public class SupportTicketModel : EntityModel<int>
{
    public string Title { get; set; } = String.Empty;
    
    [JsonConverter(typeof(ExpandableSerializer<UserViewModel, Guid>))]
    public ExpandableModel<UserViewModel, Guid> Author { get; set; }
    
    public bool Resolved { get; set; } = false;

    public DateTime CreatedAt { get; set; }

    public SupportTicketModel()
    {
    }

    public SupportTicketModel(SupportTicket ticket)
    {
        this.Key = ticket.Id;
        this.Title = ticket.Title ?? String.Empty;
        this.Author = new ExpandableModel<UserViewModel, Guid>(new UserViewModel(ticket.User));
        this.CreatedAt = ticket.CreatedAt;
        this.Resolved = ticket.Resolved;
    }
}