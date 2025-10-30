using LuxuryJW.Core.Interfaces;
using LuxuryJW.Core.Models;
using LuxuryJW.Infrastructure.Data;
using MongoDB.Driver;
using MongoDB.Bson;

namespace LuxuryJW.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly MongoDBContext _db;

    public ProductRepository(MongoDBContext db)
    {
        _db = db;
    }

    public async Task<(IReadOnlyList<Product> Items, long Total)> GetAsync(int page, int pageSize, string? category, string? searchTerm, decimal? minPrice, decimal? maxPrice, bool? isFeatured, bool? isActive, string? sortBy, string? sortDirection, CancellationToken ct)
    {
        var filter = Builders<Product>.Filter.Empty;

        if (!string.IsNullOrEmpty(category))
            filter &= Builders<Product>.Filter.Eq(p => p.Category, category);

        if (!string.IsNullOrEmpty(searchTerm))
        {
            var searchFilter = Builders<Product>.Filter.Or(
                Builders<Product>.Filter.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(searchTerm, "i")),
                Builders<Product>.Filter.Regex(p => p.Description, new MongoDB.Bson.BsonRegularExpression(searchTerm, "i")),
                Builders<Product>.Filter.Regex(p => p.MetalType, new MongoDB.Bson.BsonRegularExpression(searchTerm, "i")),
                Builders<Product>.Filter.Regex(p => p.Gemstone, new MongoDB.Bson.BsonRegularExpression(searchTerm, "i"))
            );
            filter &= searchFilter;
        }

        if (minPrice.HasValue)
            filter &= Builders<Product>.Filter.Gte(p => p.Price, minPrice.Value);

        if (maxPrice.HasValue)
            filter &= Builders<Product>.Filter.Lte(p => p.Price, maxPrice.Value);

        if (isFeatured.HasValue)
            filter &= Builders<Product>.Filter.Eq(p => p.IsFeatured, isFeatured.Value);

        if (isActive.HasValue)
            filter &= Builders<Product>.Filter.Eq(p => p.IsActive, isActive.Value);

        var total = await _db.Products.CountDocumentsAsync(filter, cancellationToken: ct);

        var sort = sortDirection?.ToLower() == "asc" 
            ? Builders<Product>.Sort.Ascending(sortBy ?? "createdAt")
            : Builders<Product>.Sort.Descending(sortBy ?? "createdAt");

        var items = await _db.Products
            .Find(filter)
            .Sort(sort)
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync(ct);

        return (items, total);
    }

    public async Task<Product?> GetByIdAsync(string id, CancellationToken ct)
    {
        return await _db.Products.Find(p => p.Id == id).FirstOrDefaultAsync(ct);
    }

    public async Task<Product?> GetBySlugAsync(string slug, CancellationToken ct)
    {
        // For now, we'll use ID as slug. In a real app, you'd have a separate slug field
        return await _db.Products.Find(p => p.Id == slug).FirstOrDefaultAsync(ct);
    }

    public async Task CreateAsync(Product product, CancellationToken ct)
    {
        await _db.Products.InsertOneAsync(product, cancellationToken: ct);
    }

    public async Task<bool> UpdateAsync(string id, Product product, CancellationToken ct)
    {
        product.UpdatedAt = DateTime.UtcNow;
        var result = await _db.Products.ReplaceOneAsync(p => p.Id == id, product, cancellationToken: ct);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id, CancellationToken ct)
    {
        var result = await _db.Products.DeleteOneAsync(p => p.Id == id, ct);
        return result.DeletedCount > 0;
    }

    public async Task<bool> UpdateStockAsync(string id, int quantity, CancellationToken ct)
    {
        var update = Builders<Product>.Update
            .Set(p => p.StockQuantity, quantity)
            .Set(p => p.UpdatedAt, DateTime.UtcNow);
        
        var result = await _db.Products.UpdateOneAsync(p => p.Id == id, update, cancellationToken: ct);
        return result.ModifiedCount > 0;
    }

    public async Task<IReadOnlyList<Product>> GetFeaturedAsync(int limit, CancellationToken ct)
    {
        return await _db.Products
            .Find(p => p.IsFeatured && p.IsActive)
            .SortByDescending(p => p.CreatedAt)
            .Limit(limit)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<Product>> GetLowStockAsync(int threshold, CancellationToken ct)
    {
        return await _db.Products
            .Find(p => p.StockQuantity <= threshold && p.IsActive)
            .SortBy(p => p.StockQuantity)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<Product>> GetByCategoryAsync(string category, int limit, CancellationToken ct)
    {
        return await _db.Products
            .Find(p => p.Category == category && p.IsActive)
            .SortByDescending(p => p.CreatedAt)
            .Limit(limit)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<string>> GetCategoriesAsync(CancellationToken ct)
    {
        var categories = await _db.Products
            .Distinct(p => p.Category, p => p.IsActive, cancellationToken: ct)
            .ToListAsync(ct);
        
        return categories.OrderBy(c => c).ToList();
    }

    public async Task<IReadOnlyList<string>> GetTagsAsync(CancellationToken ct)
    {
        var pipeline = new[]
        {
            new BsonDocument("$match", new BsonDocument("isActive", true)),
            new BsonDocument("$unwind", "$tags"),
            new BsonDocument("$group", new BsonDocument
            {
                { "_id", "$tags" },
                { "count", new BsonDocument("$sum", 1) }
            }),
            new BsonDocument("$sort", new BsonDocument("count", -1)),
            new BsonDocument("$limit", 50)
        };

        var result = await _db.Products.Aggregate<BsonDocument>(pipeline.ToList(), cancellationToken: ct).ToListAsync(ct);
        return result.Select(r => r["_id"].AsString).ToList();
    }
}
