using API.Database.Entities;

namespace API.ViewModels;

public class SupportMessageModel
{
    public int Id { get; set; }

    public Guid UserId { get; set; }
    public DateTime SentAt { get; set; }

    public string MessageContent { get; set; }
    public SupportMessageModel()
    {

    }

    public SupportMessageModel(SupportMessage message)
    {
        this.Id = message.Id;
        this.SentAt = message.SentAt;
        this.UserId = message.UserId;
        this.MessageContent = message.MessageContent;
    }
}