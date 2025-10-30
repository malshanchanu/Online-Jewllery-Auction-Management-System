using AutoMapper;
using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Interfaces;
using LuxuryJW.Core.Models;

namespace LuxuryJW.Application.Services;

public class BidService : IBidService
{
    private readonly IBidRepository _repo;
    private readonly IMapper _mapper;

    public BidService(IBidRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<(IReadOnlyList<BidResponse> Items, long Total)> GetAsync(int page, int pageSize, string? status, string? q, decimal? min, decimal? max, CancellationToken ct)
    {
        var (items, total) = await _repo.GetAsync(page, pageSize, status, q, min, max, ct);
        var mapped = items.Select(b => _mapper.Map<BidResponse>(b)).ToList();
        return (mapped, total);
    }

    public async Task<BidResponse?> GetByIdAsync(string id, CancellationToken ct)
    {
        var bid = await _repo.GetByIdAsync(id, ct);
        return bid == null ? null : _mapper.Map<BidResponse>(bid);
    }

    public Task<bool> UpdateStatusAsync(string id, string status, CancellationToken ct)
    {
        status = (status ?? "").ToLowerInvariant();
        if (status != "pending" && status != "accepted" && status != "rejected")
        {
            throw new ArgumentException("Invalid status");
        }
        return _repo.UpdateStatusAsync(id, status, ct);
    }

    public Task<bool> DeleteAsync(string id, CancellationToken ct) => _repo.DeleteAsync(id, ct);

    public async Task CreateAsync(Bid bid, CancellationToken ct)
    {
        await _repo.CreateAsync(bid, ct);
    }

    public async Task<(IReadOnlyList<BidResponse> Items, long Total)> GetByUserIdAsync(string userId, CancellationToken ct)
    {
        var (items, total) = await _repo.GetByUserIdAsync(userId, ct);
        var mapped = items.Select(b => _mapper.Map<BidResponse>(b)).ToList();
        return (mapped, total);
    }
}


