namespace API.Database.Entities;

public interface IUserOwnable
{
	public Guid GetOwnerId();
}
