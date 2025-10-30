using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LuxuryJW.Core.Models;

public class Bid
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("UserId")]
    public string UserId { get; set; } = string.Empty;

    [BsonElement("UserName")]
    public string? UserName { get; set; }

    [BsonElement("UserEmail")]
    public string? UserEmail { get; set; }

    [BsonElement("ProductId")]
    public string ProductId { get; set; } = string.Empty;

    [BsonElement("ProductName")]
    public string? ProductName { get; set; }

    [BsonElement("Amount")]
    public decimal Amount { get; set; }

    [BsonElement("Currency")]
    public string Currency { get; set; } = "USD";

    [BsonElement("Status")]
    public string Status { get; set; } = "pending"; // pending | accepted | rejected

    [BsonElement("CreatedAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}


