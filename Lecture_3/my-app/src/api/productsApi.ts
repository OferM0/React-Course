export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const API_BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }
  return response.json();
}

export async function addToCartMutation(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _productId: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _quantity: number
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true };
}
