using LuxuryJW.Core.Interfaces;
using LuxuryJW.Core.Models;
using LuxuryJW.Infrastructure.Data;
using MongoDB.Bson;
using MongoDB.Driver;

namespace LuxuryJW.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<User> _users;

    public UserRepository(MongoDBContext context)
    {
        _users = context.Users;
    }

    public async Task<User?> GetByIdAsync(string id, CancellationToken ct = default)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Id, id);
        return await _users.Find(filter).FirstOrDefaultAsync(ct);
    }

    public async Task<User?> GetByEmailAsync(string email, CancellationToken ct = default)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Email, email);
        return await _users.Find(filter).FirstOrDefaultAsync(ct);
    }

    public async Task<IReadOnlyList<User>> GetAllAsync(CancellationToken ct = default)
    {
        return await _users.Find(FilterDefinition<User>.Empty).ToListAsync(ct);
    }

    public async Task CreateAsync(User user, CancellationToken ct = default)
    {
        await _users.InsertOneAsync(user, cancellationToken: ct);
    }

    public async Task UpdateAsync(User user, CancellationToken ct = default)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Id, user.Id);
        await _users.ReplaceOneAsync(filter, user, cancellationToken: ct);
    }

    public async Task DeleteAsync(string id, CancellationToken ct = default)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Id, id);
        await _users.DeleteOneAsync(filter, ct);
    }

    public async Task CreateEmailUniqueIndexAsync(CancellationToken ct = default)
    {
        var keys = Builders<User>.IndexKeys.Ascending(u => u.Email);
        var options = new CreateIndexOptions { Unique = true, Name = "idx_users_email_unique" };
        await _users.Indexes.CreateOneAsync(new CreateIndexModel<User>(keys, options), cancellationToken: ct);
    }
}


