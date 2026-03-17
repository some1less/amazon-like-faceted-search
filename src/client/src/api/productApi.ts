import type {Product, SearchProductRequest} from "../types/product.ts";

const API_URL = 'http://localhost:5234/api/products';

export const fetchProducts = 
    async (request: SearchProductRequest) : Promise<Product[]> => {
    const url = new URL(`${API_URL}/search`);
    
    url.searchParams.append('page', request.page.toString());
    url.searchParams.append('pageSize', request.pageSize.toString());
    
    if (request.typedWord){
        url.searchParams.append('TypedWord', request.typedWord);
    }
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
        throw new Error(`HTTP Error! Something went wrong: ${response.status}`);
    }
    
    return response.json();
    }
    