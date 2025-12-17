import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

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

const fetchProductDetail = async (id: number): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return response.json();
};

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Dependent query - only runs when id exists
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetail(Number(id)),
    enabled: !!id, // Only run query if id exists
  });

  if (!id) {
    return (
      <div className="detail-container">
        <p className="error">Product ID not found</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="detail-container">
        <p className="loading">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-container">
        <p className="error">Error loading product: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate("/products")}>
        ← Back to Products
      </button>

      {product && (
        <div className="product-detail">
          <div className="detail-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="detail-info">
            <h1>{product.title}</h1>

            <div className="category">
              <strong>Category:</strong> {product.category}
            </div>

            <div className="price-section">
              <span className="price">${product.price.toFixed(2)}</span>
              <span className="rating">
                ⭐ {product.rating.rate} / 5 ({product.rating.count} reviews)
              </span>
            </div>

            <div className="description">
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>

            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
