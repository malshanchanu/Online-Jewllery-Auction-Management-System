using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Models;

namespace LuxuryJW.Core.Interfaces;

public interface IProductService
{
    Task<(IReadOnlyList<ProductResponse> Items, long Total)> GetAsync(ProductSearchRequest request, CancellationToken ct);
    Task<ProductResponse?> GetByIdAsync(string id, CancellationToken ct);
    Task<ProductResponse?> GetBySlugAsync(string slug, CancellationToken ct);
    Task<ProductResponse> CreateAsync(CreateProductRequest request, string userId, CancellationToken ct);
    Task<ProductResponse?> UpdateAsync(string id, UpdateProductRequest request, string userId, CancellationToken ct);
    Task<bool> DeleteAsync(string id, CancellationToken ct);
    Task<bool> UpdateStockAsync(string id, int quantity, CancellationToken ct);
    Task<IReadOnlyList<ProductResponse>> GetFeaturedAsync(int limit, CancellationToken ct);
    Task<IReadOnlyList<ProductResponse>> GetLowStockAsync(int threshold, CancellationToken ct);
    Task<IReadOnlyList<ProductResponse>> GetByCategoryAsync(string category, int limit, CancellationToken ct);
    Task<IReadOnlyList<string>> GetCategoriesAsync(CancellationToken ct);
    Task<IReadOnlyList<string>> GetTagsAsync(CancellationToken ct);
}
