using LuxuryJW.Core.Interfaces;
using LuxuryJW.Core.Models;
using LuxuryJW.Infrastructure.Data;
using MongoDB.Driver;

namespace LuxuryJW.Infrastructure.Repositories;

public class BidRepository : IBidRepository
{
    private readonly MongoDBContext _db;

    public BidRepository(MongoDBContext db)
    {
        _db = db;
    }

    public async Task<(IReadOnlyList<Bid> Items, long Total)> GetAsync(int page, int pageSize, string? status, string? q, decimal? min, decimal? max, CancellationToken ct)
    {
        var filterBuilder = Builders<Bid>.Filter;
        var filter = filterBuilder.Empty;

        if (!string.IsNullOrWhiteSpace(status))
        {
            filter &= filterBuilder.Eq(b => b.Status, status);
        }
        if (!string.IsNullOrWhiteSpace(q))
        {
            var text = q.Trim();
            filter &= filterBuilder.Or(
                filterBuilder.Regex(b => b.UserName, new MongoDB.Bson.BsonRegularExpression(text, "i")),
                filterBuilder.Regex(b => b.UserEmail, new MongoDB.Bson.BsonRegularExpression(text, "i")),
                filterBuilder.Regex(b => b.ProductName, new MongoDB.Bson.BsonRegularExpression(text, "i"))
            );
        }
        if (min.HasValue)
        {
            filter &= filterBuilder.Gte(b => b.Amount, min.Value);
        }
        if (max.HasValue)
        {
            filter &= filterBuilder.Lte(b => b.Amount, max.Value);
        }

        var total = await _db.Bids.CountDocumentsAsync(filter, cancellationToken: ct);
        var items = await _db.Bids
            .Find(filter)
            .SortByDescending(b => b.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync(ct);
        return (items, total);
    }

    public async Task<Bid?> GetByIdAsync(string id, CancellationToken ct)
    {
        return await _db.Bids.Find(b => b.Id == id).FirstOrDefaultAsync(ct);
    }

    public async Task CreateAsync(Bid bid, CancellationToken ct)
    {
        await _db.Bids.InsertOneAsync(bid, cancellationToken: ct);
    }

    public async Task<bool> UpdateStatusAsync(string id, string status, CancellationToken ct)
    {
        var update = Builders<Bid>.Update.Set(b => b.Status, status);
        var result = await _db.Bids.UpdateOneAsync(b => b.Id == id, update, cancellationToken: ct);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id, CancellationToken ct)
    {
        var result = await _db.Bids.DeleteOneAsync(b => b.Id == id, ct);
        return result.DeletedCount > 0;
    }

    public async Task<(IReadOnlyList<Bid> Items, long Total)> GetByUserIdAsync(string userId, CancellationToken ct)
    {
        var filter = Builders<Bid>.Filter.Eq(b => b.UserId, userId);
        var total = await _db.Bids.CountDocumentsAsync(filter, cancellationToken: ct);
        var items = await _db.Bids
            .Find(filter)
            .SortByDescending(b => b.CreatedAt)
            .ToListAsync(ct);
        return (items, total);
    }
}


