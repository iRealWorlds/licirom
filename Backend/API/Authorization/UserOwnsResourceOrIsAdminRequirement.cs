namespace API.Authorization;

using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using API.Database.Entities;

public class UserOwnsResourceOrIsAdminRequirement : 
    AuthorizationHandler<UserOwnsResourceOrIsAdminRequirement, IUserOwnable>, IAuthorizationRequirement
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                   UserOwnsResourceOrIsAdminRequirement requirement,
                                                   IUserOwnable resource)
    {
        if(context.User.IsInRole("Admin"))
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

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
