namespace LuxuryJW.Core.DTOs;

public class ProductResponse
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? OriginalPrice { get; set; }
    public string Currency { get; set; } = "USD";
    public string Category { get; set; } = string.Empty;
    public string? Subcategory { get; set; }
    public string MetalType { get; set; } = string.Empty;
    public string? Gemstone { get; set; }
    public decimal? Carat { get; set; }
    public string? Color { get; set; }
    public string? Clarity { get; set; }
    public string? Cut { get; set; }
    public string? Dimensions { get; set; }
    public decimal? Weight { get; set; }
    public List<string> Images { get; set; } = new();
    public bool IsActive { get; set; }
    public bool IsFeatured { get; set; }
    public int StockQuantity { get; set; }
    public int LowStockThreshold { get; set; }
    public List<string> Tags { get; set; } = new();
    public Dictionary<string, string> Specifications { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public string? UpdatedBy { get; set; }
}

public class CreateProductRequest
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? OriginalPrice { get; set; }
    public string Currency { get; set; } = "USD";
    public string Category { get; set; } = string.Empty;
    public string? Subcategory { get; set; }
    public string MetalType { get; set; } = string.Empty;
    public string? Gemstone { get; set; }
    public decimal? Carat { get; set; }
    public string? Color { get; set; }
    public string? Clarity { get; set; }
    public string? Cut { get; set; }
    public string? Dimensions { get; set; }
    public decimal? Weight { get; set; }
    public List<string> Images { get; set; } = new();
    public bool IsActive { get; set; } = true;
    public bool IsFeatured { get; set; } = false;
    public int StockQuantity { get; set; } = 0;
    public int LowStockThreshold { get; set; } = 5;
    public List<string> Tags { get; set; } = new();
    public Dictionary<string, string> Specifications { get; set; } = new();
}

public class UpdateProductRequest
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? OriginalPrice { get; set; }
    public string Currency { get; set; } = "USD";
    public string Category { get; set; } = string.Empty;
    public string? Subcategory { get; set; }
    public string MetalType { get; set; } = string.Empty;
    public string? Gemstone { get; set; }
    public decimal? Carat { get; set; }
    public string? Color { get; set; }
    public string? Clarity { get; set; }
    public string? Cut { get; set; }
    public string? Dimensions { get; set; }
    public decimal? Weight { get; set; }
    public List<string> Images { get; set; } = new();
    public bool IsActive { get; set; }
    public bool IsFeatured { get; set; }
    public int StockQuantity { get; set; }
    public int LowStockThreshold { get; set; }
    public List<string> Tags { get; set; } = new();
    public Dictionary<string, string> Specifications { get; set; } = new();
}

public class ProductSearchRequest
{
    public string? SearchTerm { get; set; }
    public string? Category { get; set; }
    public string? MetalType { get; set; }
    public string? Gemstone { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public bool? IsFeatured { get; set; }
    public bool? IsActive { get; set; }
    public List<string>? Tags { get; set; }
    public string? SortBy { get; set; } = "createdAt";
    public string? SortDirection { get; set; } = "desc";
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}
