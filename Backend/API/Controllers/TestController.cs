using API.Database;
using API.ViewModels;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public TestController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpGet]
    public async Task<IActionResult> Index([FromQuery] string[] expand)
    {
        var ticket = await _dbContext.SupportTickets.Include(t => t.User).FirstOrDefaultAsync();

        if (ticket == null)
        {
            return NotFound();
        }

        var model = new SupportTicketModel(ticket);

        foreach (var property in expand)
        {
            model.Expand(property);
        }

        return new JsonResult(model);
    }
}