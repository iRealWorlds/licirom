using System.Text;
using API.Database;
using API.Database.Entities;
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
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))  
    };

    // Prevent default behaviour which renames claims such as "sub" to "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    options.MapInboundClaims = false;

    options.Events = new JwtBearerEvents()
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public JwtBearerEvents(UserManager<ApplicationUser> userManager)
        {
            this._userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        },

        // Additional jwt validation: check if "sub" claim refers to an actual user
        OnTokenValidated = context =>
        {
            var userKey = context.Principal.Claims.Where(c => c.Type == "sub").First();

            if(!userKey)
            {
                context.Fail("sub claim missing");
            }

            if(!await _usersManager.FindByIdAsync(userKey))
            {
                context.Fail("User doesn't exist");
            }

            return Task.CompletedTask;
        },
    };
});

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