using Microsoft.AspNetCore.Identity;

namespace API.Database.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public virtual ICollection<Auction> Auctions { get; set; }
}