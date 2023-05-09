using Microsoft.AspNetCore.Identity;

namespace API.Database.Entities;

public class SupportTicket
{
    public int Id { get; set; }
    public String Title { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public virtual ApplicationUser User { get; set; }
    public Guid UserId { get; set; }
    public bool Resolved { get; set; } = false;
    public virtual ICollection<SupportMessage> Messages { get; set; }
}