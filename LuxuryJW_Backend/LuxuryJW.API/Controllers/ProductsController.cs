using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LuxuryJW.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts([FromQuery] ProductSearchRequest request, CancellationToken ct)
    {
        try
        {
            var (items, total) = await _productService.GetAsync(request, ct);
            return Ok(new { items, total, page = request.Page, pageSize = request.PageSize });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(string id, CancellationToken ct)
    {
        try
        {
            var product = await _productService.GetByIdAsync(id, ct);
            if (product == null) return NotFound();
            return Ok(product);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedProducts([FromQuery] int limit = 10, CancellationToken ct = default)
    {
        try
        {
            var products = await _productService.GetFeaturedAsync(limit, ct);
            return Ok(products);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories(CancellationToken ct)
    {
        try
        {
            var categories = await _productService.GetCategoriesAsync(ct);
            return Ok(categories);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("tags")]
    public async Task<IActionResult> GetTags(CancellationToken ct)
    {
        try
        {
            var tags = await _productService.GetTagsAsync(ct);
            return Ok(tags);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetProductsByCategory(string category, [FromQuery] int limit = 20, CancellationToken ct = default)
    {
        try
        {
            var products = await _productService.GetByCategoryAsync(category, limit, ct);
            return Ok(products);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductRequest request, CancellationToken ct)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var product = await _productService.CreateAsync(request, userId, ct);
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateProduct(string id, [FromBody] UpdateProductRequest request, CancellationToken ct)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var product = await _productService.UpdateAsync(id, request, userId, ct);
            if (product == null) return NotFound();
            return Ok(product);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteProduct(string id, CancellationToken ct)
    {
        try
        {
            var deleted = await _productService.DeleteAsync(id, ct);
            if (!deleted) return NotFound();
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}/stock")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateStock(string id, [FromBody] UpdateStockRequest request, CancellationToken ct)
    {
        try
        {
            var updated = await _productService.UpdateStockAsync(id, request.Quantity, ct);
            if (!updated) return NotFound();
            return Ok(new { message = "Stock updated successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("low-stock")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetLowStockProducts([FromQuery] int threshold = 5, CancellationToken ct = default)
    {
        try
        {
            var products = await _productService.GetLowStockAsync(threshold, ct);
            return Ok(products);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}

public class UpdateStockRequest
{
    public int Quantity { get; set; }
}
