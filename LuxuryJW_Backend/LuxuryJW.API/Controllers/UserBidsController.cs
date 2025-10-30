using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Interfaces;
using LuxuryJW.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LuxuryJW.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserBidsController : ControllerBase
{
    private readonly IBidService _bidService;
    private readonly IUserRepository _userRepository;

    public UserBidsController(IBidService bidService, IUserRepository userRepository)
    {
        _bidService = bidService;
        _userRepository = userRepository;
    }

    [HttpPost]
    public async Task<IActionResult> PlaceBid([FromBody] PlaceBidRequest request, CancellationToken ct)
    {
        try
        {
            Console.WriteLine($"PlaceBid called with request: {System.Text.Json.JsonSerializer.Serialize(request)}");
            
            if (request == null)
            {
                Console.WriteLine("Request is null");
                return BadRequest("Request body is null");
            }
                
            if (string.IsNullOrEmpty(request.ProductId))
            {
                Console.WriteLine($"ProductId is null or empty: '{request.ProductId}'");
                return BadRequest("ProductId is required");
            }
                
            if (request.Amount <= 0)
            {
                Console.WriteLine($"Amount is invalid: {request.Amount}");
                return BadRequest("Amount must be greater than 0");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine($"User ID from token: {userId}");
            if (string.IsNullOrEmpty(userId))
            {
                Console.WriteLine("User ID is null or empty");
                return Unauthorized();
            }

            var user = await _userRepository.GetByIdAsync(userId, ct);
            Console.WriteLine($"User found: {user?.Email}");
            if (user == null)
            {
                Console.WriteLine("User not found in database");
                return Unauthorized();
            }

            var bid = new Bid
            {
                UserId = userId,
                UserName = user.FullName,
                UserEmail = user.Email,
                ProductId = request.ProductId,
                ProductName = request.ProductName,
                Amount = request.Amount,
                Currency = request.Currency ?? "USD",
                Status = "pending",
                CreatedAt = DateTime.UtcNow
            };

            await _bidService.CreateAsync(bid, ct);
            var response = new BidResponse
            {
                Id = bid.Id,
                UserId = bid.UserId,
                UserName = bid.UserName,
                UserEmail = bid.UserEmail,
                ProductId = bid.ProductId,
                ProductName = bid.ProductName,
                Amount = bid.Amount,
                Currency = bid.Currency,
                Status = bid.Status,
                CreatedAt = bid.CreatedAt
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("my-bids")]
    public async Task<IActionResult> GetMyBids(CancellationToken ct)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var (items, total) = await _bidService.GetByUserIdAsync(userId, ct);
            return Ok(new { items, total });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBid(string id, CancellationToken ct)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var bid = await _bidService.GetByIdAsync(id, ct);
            if (bid == null)
                return NotFound();

            if (bid.UserId != userId)
                return Forbid();

            return Ok(bid);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
