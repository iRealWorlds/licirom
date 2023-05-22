namespace API.Authorization;

using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using API.Database.Entities;

public class UserIsAdminRequirement : 
    AuthorizationHandler<UserIsAdminRequirement, IUserOwnable>, IAuthorizationRequirement
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                   UserIsAdminRequirement requirement,
                                                   IUserOwnable resource)
    {
        if(context.User.IsInRole("Admin"))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
