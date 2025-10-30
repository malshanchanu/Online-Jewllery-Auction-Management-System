namespace LuxuryJW.Domain.Entities;

public class Review : BaseEntity
{
    public int Rating { get; set; } // 1-5
    public string Comment { get; set; } = string.Empty;

    public Guid ProductId { get; set; }
    public Product? Product { get; set; }

    public string UserId { get; set; } = string.Empty; // Identity user id
}


