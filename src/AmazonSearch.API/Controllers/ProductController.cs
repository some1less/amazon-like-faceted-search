using AmazonSearch.BLL.DTO.Products;
using AmazonSearch.BLL.Services.Products;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AmazonSearch.API.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase
{
    private readonly IProductService  _productService;
    
    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] SearchProductRequest request,
        CancellationToken cancellationToken)
    {
        var products = await _productService.GetProductsAsync(request, cancellationToken);
        return Ok(products);
    }
}