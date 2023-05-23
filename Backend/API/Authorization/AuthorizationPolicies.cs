namespace API.Authorization;

public class AuthorizationPolicies
{
	public const string UserOwnsResource = "UserOwnsResource";
	public const string UserIsAdmin = "UserIsAdmin";
	public const string UserOwnsResourceOrIsAdmin = "UserOwnsResourceOrIsAdmin";
}
