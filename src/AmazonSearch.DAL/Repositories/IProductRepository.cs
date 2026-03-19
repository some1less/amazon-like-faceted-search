using AmazonSearch.DAL.Entities;

namespace AmazonSearch.DAL.Repositories;

public interface IProductRepository
{
    Task<IEnumerable<Product>> SearchProductsAsync(string? word, 
        string[]? brands, string[]? categories,
        int page, int pageSize, CancellationToken ct);
    
    Task<IEnumerable<string>> GetTopBrandsAsync(int limit, CancellationToken ct);
    Task<IEnumerable<string>> GetTopCategoriesAsync(int limit, CancellationToken ct);

}