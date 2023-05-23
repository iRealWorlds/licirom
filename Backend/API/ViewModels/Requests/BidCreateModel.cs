using System.ComponentModel.DataAnnotations;

namespace API.ViewModels.Requests;

public class BidCreateModel
{
    [Required]
    public decimal Amount { get; set; }
}