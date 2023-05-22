using API.ViewModels.Requests;

namespace API.ViewModels;

public class PaginatedResult<T>
{
    public IEnumerable<T> Items { get; set; } = new List<T>();
    public int Total { get; set; } = 0;
    public int PageSize { get; set; } = 1;
    public int LastPage { get; set; } = 0;

    public PaginatedResult()
    {   
    }

    public PaginatedResult(IEnumerable<T> items, int page, int pageSize)
    {
        this.Items = items.Skip(Math.Max(page - 1 * pageSize, 0)).Take(pageSize);
        this.Total = items.Count();
        this.PageSize = pageSize;
        this.LastPage = (int) Math.Ceiling((double) this.Total / pageSize);
    }

    public PaginatedResult(IEnumerable<T> items, PaginatedRequestModel options)
    {
        this.Items = items.Skip(Math.Max(options.Page - 1 * options.PageSize, 0)).Take(options.PageSize);
        this.Total = items.Count();
        this.PageSize = options.PageSize;
        this.LastPage = (int) Math.Ceiling((double) this.Total / options.PageSize);
    }

    public PaginatedResult<TResult> Map<TResult>(Func<T, TResult> mapper)
    {
        return new PaginatedResult<TResult>()
        {
            Items = this.Items.Select(mapper),
            LastPage = this.LastPage,
            Total = this.Total,
            PageSize = this.PageSize
        };
    }
}