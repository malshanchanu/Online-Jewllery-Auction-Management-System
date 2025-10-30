using LuxuryJW.Core.Models;

namespace LuxuryJW.Core.Interfaces;

public interface IProductRepository
{
    Task<(IReadOnlyList<Product> Items, long Total)> GetAsync(int page, int pageSize, string? category, string? searchTerm, decimal? minPrice, decimal? maxPrice, bool? isFeatured, bool? isActive, string? sortBy, string? sortDirection, CancellationToken ct);
    Task<Product?> GetByIdAsync(string id, CancellationToken ct);
    Task<Product?> GetBySlugAsync(string slug, CancellationToken ct);
    Task CreateAsync(Product product, CancellationToken ct);
    Task<bool> UpdateAsync(string id, Product product, CancellationToken ct);
    Task<bool> DeleteAsync(string id, CancellationToken ct);
    Task<bool> UpdateStockAsync(string id, int quantity, CancellationToken ct);
    Task<IReadOnlyList<Product>> GetFeaturedAsync(int limit, CancellationToken ct);
    Task<IReadOnlyList<Product>> GetLowStockAsync(int threshold, CancellationToken ct);
    Task<IReadOnlyList<Product>> GetByCategoryAsync(string category, int limit, CancellationToken ct);
    Task<IReadOnlyList<string>> GetCategoriesAsync(CancellationToken ct);
    Task<IReadOnlyList<string>> GetTagsAsync(CancellationToken ct);
}
