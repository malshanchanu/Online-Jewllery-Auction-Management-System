using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LuxuryJW.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request, CancellationToken ct)
    {
        var result = await _userService.RegisterAsync(request, ct);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken ct)
    {
        var result = await _userService.LoginAsync(request, ct);
        return Ok(result);
    }

    [HttpPost("create-admin")]
    public async Task<IActionResult> CreateAdmin(CancellationToken ct)
    {
        try
        {
            var adminRequest = new RegisterRequest
            {
                FullName = "System Administrator",
                Email = "admin@luxuryjewelry.com",
                Password = "LuxuryAdmin2024!",
                Role = "Admin"
            };
            
            var result = await _userService.RegisterAsync(adminRequest, ct);
            return Ok(new { message = "Admin user created successfully", user = result });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}


