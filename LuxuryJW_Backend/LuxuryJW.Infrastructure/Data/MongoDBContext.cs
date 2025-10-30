using LuxuryJW.Core.Models;
using LuxuryJW.Core.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace LuxuryJW.Infrastructure.Data;

public class MongoDBContext
{
    private readonly IMongoDatabase _database;

    public MongoDBContext(IOptions<MongoDBSettings> settings, IMongoClient client)
    {
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    public IMongoCollection<Bid> Bids => _database.GetCollection<Bid>("Bids");
    public IMongoCollection<Product> Products => _database.GetCollection<Product>("Products");
}


