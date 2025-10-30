using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Models;

namespace LuxuryJW.Core.Interfaces;

public interface IBidService
{
    Task<(IReadOnlyList<BidResponse> Items, long Total)> GetAsync(int page, int pageSize, string? status, string? q, decimal? min, decimal? max, CancellationToken ct);
    Task<BidResponse?> GetByIdAsync(string id, CancellationToken ct);
    Task<bool> UpdateStatusAsync(string id, string status, CancellationToken ct);
    Task<bool> DeleteAsync(string id, CancellationToken ct);
    Task CreateAsync(Bid bid, CancellationToken ct);
    Task<(IReadOnlyList<BidResponse> Items, long Total)> GetByUserIdAsync(string userId, CancellationToken ct);
}


