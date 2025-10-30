using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Models;

namespace LuxuryJW.Core.Interfaces;

public interface IUserService
{
    Task<UserResponse> RegisterAsync(RegisterRequest request, CancellationToken ct = default);
    Task<UserResponse> LoginAsync(LoginRequest request, CancellationToken ct = default);
    Task<IReadOnlyList<UserResponse>> GetAllAsync(CancellationToken ct = default);
    Task<UserResponse?> GetByIdAsync(string id, CancellationToken ct = default);
    Task<UserResponse> UpdateAsync(string id, UpdateUserRequest request, string requesterId, bool requesterIsAdmin, CancellationToken ct = default);
    Task<bool> DeleteAsync(string id, string requesterId, bool requesterIsAdmin, CancellationToken ct = default);
}


