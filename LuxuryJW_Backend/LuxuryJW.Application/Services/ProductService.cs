using AutoMapper;
using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Interfaces;
using LuxuryJW.Core.Models;

namespace LuxuryJW.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<(IReadOnlyList<ProductResponse> Items, long Total)> GetAsync(ProductSearchRequest request, CancellationToken ct)
    {
        var (items, total) = await _repository.GetAsync(
            request.Page, 
            request.PageSize, 
            request.Category, 
            request.SearchTerm, 
            request.MinPrice, 
            request.MaxPrice, 
            request.IsFeatured, 
            request.IsActive, 
            request.SortBy, 
            request.SortDirection, 
            ct);

        var mapped = items.Select(p => _mapper.Map<ProductResponse>(p)).ToList();
        return (mapped, total);
    }

    public async Task<ProductResponse?> GetByIdAsync(string id, CancellationToken ct)
    {
        var product = await _repository.GetByIdAsync(id, ct);
        return product != null ? _mapper.Map<ProductResponse>(product) : null;
    }

    public async Task<ProductResponse?> GetBySlugAsync(string slug, CancellationToken ct)
    {
        var product = await _repository.GetBySlugAsync(slug, ct);
        return product != null ? _mapper.Map<ProductResponse>(product) : null;
    }

    public async Task<ProductResponse> CreateAsync(CreateProductRequest request, string userId, CancellationToken ct)
    {
        var product = _mapper.Map<Product>(request);
        product.CreatedBy = userId;
        product.CreatedAt = DateTime.UtcNow;
        product.UpdatedAt = DateTime.UtcNow;

        await _repository.CreateAsync(product, ct);
        return _mapper.Map<ProductResponse>(product);
    }

    public async Task<ProductResponse?> UpdateAsync(string id, UpdateProductRequest request, string userId, CancellationToken ct)
    {
        var existingProduct = await _repository.GetByIdAsync(id, ct);
        if (existingProduct == null) return null;

        _mapper.Map(request, existingProduct);
        existingProduct.UpdatedBy = userId;
        existingProduct.UpdatedAt = DateTime.UtcNow;

        var updated = await _repository.UpdateAsync(id, existingProduct, ct);
        return updated ? _mapper.Map<ProductResponse>(existingProduct) : null;
    }

    public async Task<bool> DeleteAsync(string id, CancellationToken ct)
    {
        return await _repository.DeleteAsync(id, ct);
    }

    public async Task<bool> UpdateStockAsync(string id, int quantity, CancellationToken ct)
    {
        return await _repository.UpdateStockAsync(id, quantity, ct);
    }

    public async Task<IReadOnlyList<ProductResponse>> GetFeaturedAsync(int limit, CancellationToken ct)
    {
        var products = await _repository.GetFeaturedAsync(limit, ct);
        return products.Select(p => _mapper.Map<ProductResponse>(p)).ToList();
    }

    public async Task<IReadOnlyList<ProductResponse>> GetLowStockAsync(int threshold, CancellationToken ct)
    {
        var products = await _repository.GetLowStockAsync(threshold, ct);
        return products.Select(p => _mapper.Map<ProductResponse>(p)).ToList();
    }

    public async Task<IReadOnlyList<ProductResponse>> GetByCategoryAsync(string category, int limit, CancellationToken ct)
    {
        var products = await _repository.GetByCategoryAsync(category, limit, ct);
        return products.Select(p => _mapper.Map<ProductResponse>(p)).ToList();
    }

    public async Task<IReadOnlyList<string>> GetCategoriesAsync(CancellationToken ct)
    {
        return await _repository.GetCategoriesAsync(ct);
    }

    public async Task<IReadOnlyList<string>> GetTagsAsync(CancellationToken ct)
    {
        return await _repository.GetTagsAsync(ct);
    }
}
