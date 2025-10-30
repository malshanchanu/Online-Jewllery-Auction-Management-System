using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LuxuryJW.Core.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("FullName")]
    public string FullName { get; set; } = string.Empty;

    [BsonElement("Email")]
    public string Email { get; set; } = string.Empty;

    [BsonElement("PasswordHash")]
    public string PasswordHash { get; set; } = string.Empty;

    [BsonElement("Role")]
    public string Role { get; set; } = "User";

    [BsonElement("CreatedAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("UpdatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Optional profile fields
    [BsonElement("PhoneNumber")]
    public string? PhoneNumber { get; set; }

    [BsonElement("DateOfBirth")]
    public DateTime? DateOfBirth { get; set; }

    [BsonElement("Gender")]
    public string? Gender { get; set; }

    [BsonElement("AddressLine1")]
    public string? AddressLine1 { get; set; }

    [BsonElement("AddressLine2")]
    public string? AddressLine2 { get; set; }

    [BsonElement("City")]
    public string? City { get; set; }

    [BsonElement("State")]
    public string? State { get; set; }

    [BsonElement("PostalCode")]
    public string? PostalCode { get; set; }

    [BsonElement("Country")]
    public string? Country { get; set; }

    // Store as a URL or data URI
    [BsonElement("AvatarUrl")]
    public string? AvatarUrl { get; set; }
}


