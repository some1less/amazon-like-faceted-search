using System.Text;
using AmazonSearch.DAL.Entities;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace AmazonSearch.DAL.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly string _connectionString;
    
    public ProductRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")
            ?? throw new InvalidOperationException("Connection string not found");
    }
    
    
    public async Task<IEnumerable<Product>> SearchProductsAsync(string? word, int page, int pageSize,
        CancellationToken cancellationToken)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        
        await connection.OpenAsync(cancellationToken);

        var sqlBuilder = new StringBuilder();
        sqlBuilder.Append("SELECT id AS Id, name AS Name, brand AS Brand, image_url AS ImageUrl, categories AS Categories ");
        sqlBuilder.Append("FROM products WHERE 1=1 ");

        var parameters = new DynamicParameters();

        if (!string.IsNullOrWhiteSpace(word))
        {
            sqlBuilder.Append("AND name ILIKE @Word ");
            parameters.Add("Word", $"%{word}%");
        }
        
        sqlBuilder.Append("ORDER BY id ");
        sqlBuilder.Append("LIMIT @Limit OFFSET @Offset;");
        
        parameters.Add("Limit", pageSize);
        parameters.Add("Offset", (page - 1) * pageSize);
        
        return await connection.QueryAsync<Product>(new CommandDefinition(
            sqlBuilder.ToString(), parameters,
            cancellationToken: cancellationToken));
    }
}