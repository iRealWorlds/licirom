using System.Text.Json.Serialization;
using API.Database.Entities;
using API.ViewModels.Converters;

namespace API.ViewModels;

public class ProfileReviewViewModel
{
    public string Content { get; set; } = String.Empty;
    public int Score { get; set; }
    [JsonConverter(typeof(ExpandableConverter<UserViewModel, Guid>))]
    public ExpandableModel<UserViewModel, Guid> Reviewer { get; set; }
    [JsonConverter(typeof(ExpandableConverter<UserViewModel, Guid>))]
    public ExpandableModel<UserViewModel, Guid> Target { get; set; }
    public DateTime SubmitTime { get; set; }
    
    public ProfileReviewViewModel()
    { }

    public ProfileReviewViewModel(ProfileReview profileReview) 
    {
        this.Content = profileReview.Content ?? String.Empty;
        this.Score = profileReview.Score;
        this.SubmitTime = profileReview.SubmitTime;
        this.Reviewer = new ExpandableModel<UserViewModel, Guid>(new UserViewModel(profileReview.Reviewer));
        this.Target = new ExpandableModel<UserViewModel, Guid>(new UserViewModel(profileReview.Target));
    }
}
