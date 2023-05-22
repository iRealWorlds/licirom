using API.Database.Entities;
namespace API.ViewModels;

public class SupportTicketModel
{
    public int Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public Guid UserId { get; set; }
    public bool Resolved { get; set; } = false;
    public DateTime CreatedAt { get; set; }

    public SupportTicketModel()
    {
    }

    public SupportTicketModel(SupportTicket ticket)
    {
        this.Id = ticket.Id;
        this.Title = ticket.Title ?? String.Empty;
        this.CreatedAt = ticket.CreatedAt;
        this.UserId = ticket.UserId;
        this.Resolved = ticket.Resolved;
    }
}