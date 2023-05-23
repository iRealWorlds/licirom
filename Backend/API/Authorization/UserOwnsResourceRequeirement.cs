namespace API.Authorization;

using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using API.Database.Entities;

public class UserOwnsResourceRequirement : 
    AuthorizationHandler<UserOwnsResourceRequirement, IUserOwnable>, IAuthorizationRequirement
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                   UserOwnsResourceRequirement requirement,
                                                   IUserOwnable resource)
    {
        var ownerId = resource.GetOwnerId();

        if(context.User.HasClaim(c => (
                c.Type == JwtRegisteredClaimNames.Sub &&
                Guid.Parse(c.Value) == ownerId
            )))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
