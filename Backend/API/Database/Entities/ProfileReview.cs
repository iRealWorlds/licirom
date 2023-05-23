using Microsoft.AspNetCore.Identity;

namespace API.Database.Entities;

public class ProfileReview
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Content { get; set; }
    public int Score { get; set; }
    public Guid ReviewerKey { get; set; }
    public virtual ApplicationUser Reviewer { get; set; }
    public Guid TargetKey { get; set; }
    public virtual ApplicationUser Target { get; set; }
    public DateTime SubmitTime { get; set; } = DateTime.UtcNow;
}
