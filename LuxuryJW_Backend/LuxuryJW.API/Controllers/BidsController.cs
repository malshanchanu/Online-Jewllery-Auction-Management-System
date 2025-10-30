using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LuxuryJW.API.Controllers;

[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin")]
public class BidsController : ControllerBase
{
    private readonly IBidService _service;

    public BidsController(IBidService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] int page = 1, [FromQuery] int pageSize = 10,
        [FromQuery] string? status = null, [FromQuery] string? q = null,
        [FromQuery] decimal? min = null, [FromQuery] decimal? max = null, CancellationToken ct = default)
    {
        var (items, total) = await _service.GetAsync(page <= 0 ? 1 : page, Math.Clamp(pageSize, 1, 100), status, q, min, max, ct);
        return Ok(new { items, total });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id, CancellationToken ct)
    {
        var bid = await _service.GetByIdAsync(id, ct);
        return bid == null ? NotFound() : Ok(bid);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(string id, [FromBody] UpdateBidStatusRequest body, CancellationToken ct)
    {
        var ok = await _service.UpdateStatusAsync(id, body.Status, ct);
        return ok ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id, CancellationToken ct)
    {
        var ok = await _service.DeleteAsync(id, ct);
        return ok ? NoContent() : NotFound();
    }
}


