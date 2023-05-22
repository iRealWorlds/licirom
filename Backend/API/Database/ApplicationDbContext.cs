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
    public DbSet<AuctionComment> AuctionComments { get; set; }
    public DbSet<Bid> Bids { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);


        builder.Entity<Auction>()
        .Property(e => e.CurrentStatus)
        .HasConversion<int>();

        builder.Entity<ApplicationUser>(b =>
        {
            b.ToTable("IdentityUsers");
            b.HasMany(u => u.Auctions)
                .WithOne(a => a.Creator)
                .HasForeignKey(a => a.CreatorKey)
                .OnDelete(DeleteBehavior.ClientCascade);
            b.HasMany(a => a.Bids)
                .WithOne(b => b.Buyer)
                .HasForeignKey(b => b.BuyerKey)
                .OnDelete(DeleteBehavior.ClientCascade);
            b.HasMany(a => a.AuctionComments)
                .WithOne(c => c.Author)
                .HasForeignKey(b => b.AuthorKey)
                .OnDelete(DeleteBehavior.ClientCascade);
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
            e.HasMany(c => c.Children)
                .WithOne(c => c.Parent)
                .HasForeignKey(c => c.ParentKey)
                .OnDelete(DeleteBehavior.ClientCascade);
            e.HasMany(a => a.Auctions)
                .WithOne(a => a.Category)
                .HasForeignKey(c => c.CategoryKey)
                .OnDelete(DeleteBehavior.ClientCascade);
        });
        builder.Entity<Auction>(e =>
        {
            e.HasKey(a => a.Key);
            e.HasMany(a => a.Comments)
                .WithOne(c => c.Auction)
                .HasForeignKey(c => c.AuctionKey)
                .OnDelete(DeleteBehavior.ClientCascade);
            e.HasMany(a => a.Bids)
                .WithOne(b => b.Auction)
                .HasForeignKey(b => b.AuctionKey)
                .OnDelete(DeleteBehavior.ClientCascade);
        });
        builder.Entity<AuctionComment>(e =>
        {
            e.HasKey(c => c.Key);
        });
        builder.Entity<Bid>(e =>
        {
            e.HasKey(b => b.Key);
            e.Property(b => b.Amount).HasPrecision(10, 2);
        });
    }
}
