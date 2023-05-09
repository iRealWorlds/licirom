using Microsoft.AspNetCore.Identity;

namespace API.Database.Entities;

public class SupportMessage
{
    public int Id { get; set; }
    public virtual SupportTicket Ticket { get; set; }
    public int TicketId { get; set; }
    public virtual ApplicationUser User { get; set; }
    public Guid UserId { get; set; }
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
    public string MessageContent { get; set; }
}