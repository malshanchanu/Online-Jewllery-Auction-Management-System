using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LuxuryJW.Core.Models;

public class Order
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("orderNumber")]
    public string OrderNumber { get; set; } = string.Empty;

    [BsonElement("userId")]
    public string UserId { get; set; } = string.Empty;

    [BsonElement("userName")]
    public string UserName { get; set; } = string.Empty;

    [BsonElement("userEmail")]
    public string UserEmail { get; set; } = string.Empty;

    [BsonElement("items")]
    public List<OrderItem> Items { get; set; } = new();

    [BsonElement("subtotal")]
    public decimal Subtotal { get; set; }

    [BsonElement("tax")]
    public decimal Tax { get; set; }

    [BsonElement("shipping")]
    public decimal Shipping { get; set; }

    [BsonElement("discount")]
    public decimal Discount { get; set; }

    [BsonElement("total")]
    public decimal Total { get; set; }

    [BsonElement("currency")]
    public string Currency { get; set; } = "USD";

    [BsonElement("status")]
    public string Status { get; set; } = "pending";

    [BsonElement("paymentStatus")]
    public string PaymentStatus { get; set; } = "pending";

    [BsonElement("paymentMethod")]
    public string? PaymentMethod { get; set; }

    [BsonElement("paymentId")]
    public string? PaymentId { get; set; }

    [BsonElement("shippingAddress")]
    public Address ShippingAddress { get; set; } = new();

    [BsonElement("billingAddress")]
    public Address BillingAddress { get; set; } = new();

    [BsonElement("notes")]
    public string? Notes { get; set; }

    [BsonElement("trackingNumber")]
    public string? TrackingNumber { get; set; }

    [BsonElement("shippedAt")]
    public DateTime? ShippedAt { get; set; }

    [BsonElement("deliveredAt")]
    public DateTime? DeliveredAt { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class OrderItem
{
    [BsonElement("productId")]
    public string ProductId { get; set; } = string.Empty;

    [BsonElement("productName")]
    public string ProductName { get; set; } = string.Empty;

    [BsonElement("productImage")]
    public string? ProductImage { get; set; }

    [BsonElement("quantity")]
    public int Quantity { get; set; }

    [BsonElement("unitPrice")]
    public decimal UnitPrice { get; set; }

    [BsonElement("totalPrice")]
    public decimal TotalPrice { get; set; }

    [BsonElement("specifications")]
    public Dictionary<string, string> Specifications { get; set; } = new();
}

public class Address
{
    [BsonElement("firstName")]
    public string FirstName { get; set; } = string.Empty;

    [BsonElement("lastName")]
    public string LastName { get; set; } = string.Empty;

    [BsonElement("company")]
    public string? Company { get; set; }

    [BsonElement("addressLine1")]
    public string AddressLine1 { get; set; } = string.Empty;

    [BsonElement("addressLine2")]
    public string? AddressLine2 { get; set; }

    [BsonElement("city")]
    public string City { get; set; } = string.Empty;

    [BsonElement("state")]
    public string State { get; set; } = string.Empty;

    [BsonElement("postalCode")]
    public string PostalCode { get; set; } = string.Empty;

    [BsonElement("country")]
    public string Country { get; set; } = string.Empty;

    [BsonElement("phone")]
    public string? Phone { get; set; }
}
