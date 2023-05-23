using System.Text.Json.Serialization;
using API.Database.Entities;
using API.ViewModels.Converters;

namespace API.ViewModels;

public class SupportMessageModel : EntityModel<int>
{
    [JsonConverter(typeof(ExpandableConverter<UserViewModel, Guid>))]
    public ExpandableModel<UserViewModel, Guid> User { get; set; }
    
    public DateTime SentAt { get; set; }
    public string MessageContent { get; set; }
    
    public SupportMessageModel()
    {

    }

    public SupportMessageModel(SupportMessage message)
    {
        this.Key = message.Id;
        this.SentAt = message.SentAt;
        this.User = new ExpandableModel<UserViewModel, Guid>(new UserViewModel(message.User));
        this.MessageContent = message.MessageContent;
    }
}