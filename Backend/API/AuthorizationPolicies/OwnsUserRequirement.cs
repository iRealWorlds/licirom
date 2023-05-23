namespace API.AuthorizationPolicies;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using System.IdentityModel.Tokens.Jwt;

public class OwnsUserRequirement : AuthorizationHandler<OwnsUserRequirement>, IAuthorizationRequirement
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        OwnsUserRequirement requirement)
    {
        var userKey = ((HttpContext)context.Resource).GetRouteValue("userKey").ToString();

        if(context.User.IsInRole("Admin") ||
            context.User.HasClaim(c => (
                c.Type == JwtRegisteredClaimNames.Sub &&
                c.Value == userKey
            )))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
