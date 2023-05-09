using API.Database.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Database;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public DbSet<SupportTicket> SupportTickets { get; set; }
    public DbSet<SupportMessage> SupportMessages { get; set; }
    public DbSet<AuctionCategory> AuctionCategories { get; set; }
    public DbSet<Auction> Auctions { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ApplicationUser>(b =>
        {
            b.ToTable("IdentityUsers");
        });

        builder.Entity<IdentityUserClaim<Guid>>(b =>
        {
            b.ToTable("IdentityUserClaims");
        });

        builder.Entity<IdentityUserLogin<Guid>>(b =>
        {
            b.ToTable("IdentityUserLogins");
        });

        builder.Entity<IdentityUserToken<Guid>>(b =>
        {
            b.ToTable("IdentityUserTokens");
        });

        builder.Entity<IdentityRole<Guid>>(b =>
        {
            b.ToTable("IdentityRoles");
        });

        builder.Entity<IdentityRoleClaim<Guid>>(b =>
        {
            b.ToTable("IdentityRoleClaims");
        });

        builder.Entity<IdentityUserRole<Guid>>(b =>
        {
            b.ToTable("IdentityUserRoles");
        });
        builder.Entity<SupportTicket>(b =>
        {
            b.ToTable("SupportTickets");
        });
        builder.Entity<SupportMessage>(b =>
        {
            b.ToTable("SupportMessages");
        });
        builder.Entity<AuctionCategory>(e =>
        {
            e.HasKey(c => c.Key);
            e.HasOne(c => c.Parent)
                .WithMany(c => c.Children)
                .HasForeignKey(c => c.ParentKey);
        });
        builder.Entity<Auction>(e =>
        {
            e.HasKey(a => a.Key);
            e.HasOne(a => a.Creator)
                .WithMany(a => a.Auctions)
                .HasForeignKey(c => c.CreatorKey);
            e.HasOne(a => a.Category)
                .WithMany(a => a.Auctions)
                .HasForeignKey(c => c.CategoryKey);
        });
    }
}
