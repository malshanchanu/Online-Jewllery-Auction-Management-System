using AutoMapper;
using BCrypt.Net;
using LuxuryJW.Application.Helpers;
using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Interfaces;
using LuxuryJW.Core.Models;
using Microsoft.Extensions.Configuration;

namespace LuxuryJW.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repo;
    private readonly IMapper _mapper;
    private readonly JwtTokenGenerator _jwt;
    private readonly IConfiguration _config;

    public UserService(IUserRepository repo, IMapper mapper, JwtTokenGenerator jwt, IConfiguration config)
    {
        _repo = repo;
        _mapper = mapper;
        _jwt = jwt;
        _config = config;
    }

    public async Task<UserResponse> RegisterAsync(RegisterRequest request, CancellationToken ct = default)
    {
        var existing = await _repo.GetByEmailAsync(request.Email, ct);
        if (existing != null) throw new InvalidOperationException("Email already registered");

        // If requesting Admin role, enforce allowlist
        if (!string.IsNullOrWhiteSpace(request.Role) && string.Equals(request.Role, "Admin", StringComparison.OrdinalIgnoreCase))
        {
            var allowed = _config.GetSection("Admin:AllowedEmails").Get<string[]>() ?? Array.Empty<string>();
            var isAllowed = allowed.Any(e => string.Equals(e?.Trim(), request.Email?.Trim(), StringComparison.OrdinalIgnoreCase));
            if (!isAllowed)
            {
                throw new UnauthorizedAccessException("This email is not authorized for Admin role");
            }
        }

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = string.IsNullOrWhiteSpace(request.Role) ? "User" : request.Role,
            PhoneNumber = request.PhoneNumber,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender,
            AddressLine1 = request.AddressLine1,
            AddressLine2 = request.AddressLine2,
            City = request.City,
            State = request.State,
            PostalCode = request.PostalCode,
            Country = request.Country,
            AvatarUrl = request.AvatarUrl
        };

        await _repo.CreateAsync(user, ct);
        var token = _jwt.GenerateToken(user.Id, user.Email, user.Role);
        var response = _mapper.Map<UserResponse>(user);
        response.Token = token;
        return response;
    }

    public async Task<UserResponse> LoginAsync(LoginRequest request, CancellationToken ct = default)
    {
        var user = await _repo.GetByEmailAsync(request.Email, ct) ?? throw new UnauthorizedAccessException("Invalid credentials");
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash)) throw new UnauthorizedAccessException("Invalid credentials");

        var token = _jwt.GenerateToken(user.Id, user.Email, user.Role);
        var response = _mapper.Map<UserResponse>(user);
        response.Token = token;
        return response;
    }

    public async Task<IReadOnlyList<UserResponse>> GetAllAsync(CancellationToken ct = default)
    {
        var users = await _repo.GetAllAsync(ct);
        return users.Select(u => _mapper.Map<UserResponse>(u)).ToList();
    }

    public async Task<UserResponse?> GetByIdAsync(string id, CancellationToken ct = default)
    {
        var user = await _repo.GetByIdAsync(id, ct);
        return user == null ? null : _mapper.Map<UserResponse>(user);
    }

    public async Task<UserResponse> UpdateAsync(string id, UpdateUserRequest request, string requesterId, bool requesterIsAdmin, CancellationToken ct = default)
    {
        if (!requesterIsAdmin && requesterId != id) throw new UnauthorizedAccessException("Forbidden");

        var user = await _repo.GetByIdAsync(id, ct) ?? throw new KeyNotFoundException("User not found");
        if (!string.IsNullOrWhiteSpace(request.FullName)) user.FullName = request.FullName;
        if (!string.IsNullOrWhiteSpace(request.Email)) user.Email = request.Email;
        if (!string.IsNullOrWhiteSpace(request.Password)) user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        if (!string.IsNullOrWhiteSpace(request.Role) && requesterIsAdmin) user.Role = request.Role; // role changes only by admins
        if (!string.IsNullOrWhiteSpace(request.PhoneNumber)) user.PhoneNumber = request.PhoneNumber;
        if (request.DateOfBirth.HasValue) user.DateOfBirth = request.DateOfBirth;
        if (!string.IsNullOrWhiteSpace(request.Gender)) user.Gender = request.Gender;
        if (!string.IsNullOrWhiteSpace(request.AddressLine1)) user.AddressLine1 = request.AddressLine1;
        if (!string.IsNullOrWhiteSpace(request.AddressLine2)) user.AddressLine2 = request.AddressLine2;
        if (!string.IsNullOrWhiteSpace(request.City)) user.City = request.City;
        if (!string.IsNullOrWhiteSpace(request.State)) user.State = request.State;
        if (!string.IsNullOrWhiteSpace(request.PostalCode)) user.PostalCode = request.PostalCode;
        if (!string.IsNullOrWhiteSpace(request.Country)) user.Country = request.Country;
        if (!string.IsNullOrWhiteSpace(request.AvatarUrl)) user.AvatarUrl = request.AvatarUrl;

        // Update the UpdatedAt timestamp
        user.UpdatedAt = DateTime.UtcNow;

        await _repo.UpdateAsync(user, ct);
        return _mapper.Map<UserResponse>(user);
    }

    public async Task<bool> DeleteAsync(string id, string requesterId, bool requesterIsAdmin, CancellationToken ct = default)
    {
        if (!requesterIsAdmin && requesterId != id) throw new UnauthorizedAccessException("Forbidden");
        var user = await _repo.GetByIdAsync(id, ct);
        if (user == null) return false;
        await _repo.DeleteAsync(id, ct);
        return true;
    }
}


