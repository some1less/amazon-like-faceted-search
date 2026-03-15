using AmazonSearch.BLL.DTO.Products;
using AmazonSearch.DAL.Entities;
using AmazonSearch.DAL.Repositories;

namespace AmazonSearch.BLL.Services.Products;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<Product>> GetProductsAsync(SearchProductRequest request, 
        CancellationToken cancellationToken)
    {
        int validPage = request.Page < 1 ? 1 : request.Page;
        int validPageSize = request.PageSize > 100 ? 100 : request.PageSize;

        return await _productRepository.SearchProductsAsync(request.TypedWord, validPage, validPageSize, cancellationToken);
    }
}