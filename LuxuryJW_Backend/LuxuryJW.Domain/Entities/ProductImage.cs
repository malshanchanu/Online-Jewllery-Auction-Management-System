namespace LuxuryJW.Domain.Entities;

public class ProductImage : BaseEntity
{
    public string Url { get; set; } = string.Empty;
    public Guid ProductId { get; set; }
    public Product? Product { get; set; }
}


