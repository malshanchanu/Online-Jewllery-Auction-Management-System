using LuxuryJW.Core.Models;

namespace LuxuryJW.Core.Interfaces;

public interface IBidRepository
{
    Task<(IReadOnlyList<Bid> Items, long Total)> GetAsync(int page, int pageSize, string? status, string? q, decimal? min, decimal? max, CancellationToken ct);
    Task<Bid?> GetByIdAsync(string id, CancellationToken ct);
    Task CreateAsync(Bid bid, CancellationToken ct);
    Task<bool> UpdateStatusAsync(string id, string status, CancellationToken ct);
    Task<bool> DeleteAsync(string id, CancellationToken ct);
    Task<(IReadOnlyList<Bid> Items, long Total)> GetByUserIdAsync(string userId, CancellationToken ct);
}


