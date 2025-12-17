import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Products.css";

interface Product {
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

const fetchProducts = async (category?: string): Promise<Product[]> => {
  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", selectedCategory || "all"],
    queryFn: () => fetchProducts(selectedCategory || undefined),
  });

  const categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  if (isLoading) {
    return (
      <div className="products-container">
        <p className="loading">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-container">
        <p className="error">Error loading products: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1>Products</h1>

      <div className="filter-section">
        <label htmlFor="category-select">Filter by Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === "All" ? "" : cat}>
              {cat}
            </option>
          ))}
        </select>
        <p className="cache-info">
          📊 Query Key: ["products", "{selectedCategory || "all"}"]
        </p>
      </div>

      <div className="products-list">
        {data?.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="product-card"
          >
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h3>{product.title}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="rating">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
