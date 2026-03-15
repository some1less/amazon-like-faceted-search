import { useEffect, useState } from 'react'

interface Product {
  id: string;
  name: string;
  imageUrl: string | null;
  brand: string | null;
  categories: string[];
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');   
  const [page, setPage] = useState<number>(1);                

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = new URL('http://localhost:5234/api/products/search');
        url.searchParams.append('page', page.toString());
        url.searchParams.append('pageSize', '10');

        if (searchTerm) {
          url.searchParams.append('TypedWord', searchTerm);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, page]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);    
    setSearchTerm(searchInput);
  };

  return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Type anything you want to find</h1>
        
        <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products (e.g., milk, chocolate)..."
              style={{ padding: '10px', flex: 1, fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Search
          </button>
        </form>

        {loading && <h2>Loading products...</h2>}
        {error && <h2 style={{ color: 'red' }}>Error: {error}</h2>}

        {!loading && !error && (
            <>
              <p>Showing {products.length} products directly from PostgreSQL!</p>

              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {products.map((product: Product) => (
                    <li key={product.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                      <strong>{product.name}</strong>
                      {product.brand && <span style={{ color: '#666' }}> (Brand - {product.brand})</span>}
                    </li>
                ))}
              </ul>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={{ padding: '8px 16px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                >
                  Previous
                </button>

                <span style={{ fontWeight: 'bold' }}>Page {page}</span>

                <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={products.length < 10}
                    style={{ padding: '8px 16px', cursor: products.length < 10 ? 'not-allowed' : 'pointer' }}
                >
                  Next
                </button>
              </div>
            </>
        )}
      </div>
  );
}

export default App;