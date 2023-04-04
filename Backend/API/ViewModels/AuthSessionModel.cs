namespace API.ViewModels;

public class AuthSessionModel
{
    public string Token { get; set; }
    
    public AuthSessionModel()
    {
    }
    
    public AuthSessionModel(string token)
    {
        this.Token = token;
    }
}