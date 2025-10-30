using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LuxuryJW.Core.Models;

public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("price")]
    public decimal Price { get; set; }

    [BsonElement("originalPrice")]
    public decimal? OriginalPrice { get; set; }

    [BsonElement("currency")]
    public string Currency { get; set; } = "USD";

    [BsonElement("category")]
    public string Category { get; set; } = string.Empty;

    [BsonElement("subcategory")]
    public string? Subcategory { get; set; }

    [BsonElement("metalType")]
    public string MetalType { get; set; } = string.Empty;

    [BsonElement("gemstone")]
    public string? Gemstone { get; set; }

    [BsonElement("carat")]
    public decimal? Carat { get; set; }

    [BsonElement("color")]
    public string? Color { get; set; }

    [BsonElement("clarity")]
    public string? Clarity { get; set; }

    [BsonElement("cut")]
    public string? Cut { get; set; }

    [BsonElement("dimensions")]
    public string? Dimensions { get; set; }

    [BsonElement("weight")]
    public decimal? Weight { get; set; }

    [BsonElement("images")]
    public List<string> Images { get; set; } = new();

    [BsonElement("isActive")]
    public bool IsActive { get; set; } = true;

    [BsonElement("isFeatured")]
    public bool IsFeatured { get; set; } = false;

    [BsonElement("stockQuantity")]
    public int StockQuantity { get; set; } = 0;

    [BsonElement("lowStockThreshold")]
    public int LowStockThreshold { get; set; } = 5;

    [BsonElement("tags")]
    public List<string> Tags { get; set; } = new();

    [BsonElement("specifications")]
    public Dictionary<string, string> Specifications { get; set; } = new();

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("createdBy")]
    public string CreatedBy { get; set; } = string.Empty;

    [BsonElement("updatedBy")]
    public string? UpdatedBy { get; set; }
}
