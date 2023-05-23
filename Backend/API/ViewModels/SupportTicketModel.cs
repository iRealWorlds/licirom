using System.Text.Json.Serialization;
using API.Database.Entities;
using API.ViewModels.Converters;

namespace API.ViewModels;

public class SupportTicketModel : EntityModel<int>
{
    public string Title { get; set; } = String.Empty;

    [JsonConverter(typeof(ExpandableConverter<UserViewModel, Guid>))]
    public ExpandableModel<UserViewModel, Guid> User { get; set; }
    
    public bool Resolved { get; set; } = false;
    public DateTime CreatedAt { get; set; }

    public SupportTicketModel()
    {
    }

    public SupportTicketModel(SupportTicket ticket)
    {
        this.Key = ticket.Id;
        this.Title = ticket.Title ?? String.Empty;
        this.CreatedAt = ticket.CreatedAt;
        this.User = new ExpandableModel<UserViewModel, Guid>(new UserViewModel(ticket.User));
        this.Resolved = ticket.Resolved;
    }
}