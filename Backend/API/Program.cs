using System.Text;
using API.Database;
using API.Database.Entities;
using API.Authorization;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();
builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration["ConnectionString"]);
});

builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;  
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;  
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.SaveToken = true;  
    options.RequireHttpsMetadata = false;  
    options.TokenValidationParameters = new TokenValidationParameters()  
    {  
        ValidateIssuer = true,  
        ValidateAudience = true,  
        ValidAudience = builder.Configuration["JWT:ValidAudience"],  
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],  
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),
        NameClaimType = "sub"
    };

    options.Events = new JwtBearerEvents
    {
        // Additional jwt validation: check if "sub" claim refers to an actual user
        OnTokenValidated = async (context) =>
        {
            var userManager = context.HttpContext.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
            var subClaim = context.Principal.Claims.Where(c => c.Type == "sub").FirstOrDefault();

            if(subClaim == null)
            {
                context.Fail("sub claim missing");
            }

            var subId = Guid.Parse(subClaim.Value);
            if(await userManager.FindByIdAsync(subId.ToString()) == null)
            {
                context.Fail("User doesn't exist");
            }
        }
    };

    // Prevent default behaviour which renames claims such as "sub" to "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    options.MapInboundClaims = false;

});

builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = "sub";
});

builder.Services.AddAuthorization(options => {
    options.AddPolicy(AuthorizationPolicies.UserOwnsResource, policy => {
        policy.Requirements.Add(new UserOwnsResourceRequirement());
    });
    options.AddPolicy(AuthorizationPolicies.UserIsAdmin, policy => {
        policy.Requirements.Add(new UserIsAdminRequirement());
    });
    options.AddPolicy(AuthorizationPolicies.UserOwnsResourceOrIsAdmin, policy => {
        policy.Requirements.Add(new UserOwnsResourceOrIsAdminRequirement());
    });
});

builder.Services.AddScoped<AuctionService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:4200", "https://localhost:4200", "http://127.0.0.1:4200", "https://127.0.0.1:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();