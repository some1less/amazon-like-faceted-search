namespace AmazonSearch.BLL.DTO.Products;

public class SearchProductRequest
{
    public string? TypedWord { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}