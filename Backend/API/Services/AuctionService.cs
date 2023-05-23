using API.Database;
using API.Database.Entities;

namespace API.Services;

public class AuctionService
{
    private readonly ApplicationDbContext _dbContext;

	public AuctionService(ApplicationDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<decimal> GetMinimumBidAmount(Auction auction)
	{
		// Load all bids
        await _dbContext.Entry(auction).Collection(a => a.Bids).LoadAsync();

        return auction.Bids
        	.Select(bid => bid.Amount + auction.MinimumIncrement)
        	.Append(auction.StartPrice)
        	.Max();
	}
}
