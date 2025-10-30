namespace LuxuryJW.Domain.Entities;

public class CartItem : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }

    public Product? Product { get; set; }
}


