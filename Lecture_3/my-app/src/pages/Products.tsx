import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/productsApi.ts";
import { ProductCard } from "../components/ProductCard";

export function ProductsPage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load products</p>
          <p className="text-gray-600 text-sm">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-10 text-gray-900">All Products</h1>

      <div className="grid grid-cols-4 gap-8">
        {products?.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <ProductCard
              name={product.title}
              price={`$${product.price.toFixed(2)}`}
              imageUrl={product.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
