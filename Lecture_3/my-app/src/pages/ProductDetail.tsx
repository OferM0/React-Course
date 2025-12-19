import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../api/productsApi.ts";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNotificationStore } from "../stores/notificationStore.ts";
import { useCartStore } from "../stores/cartStore";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load product</p>
          <p className="text-gray-600 text-sm">{(error as Error).message}</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 text-gray-900 hover:underline"
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  if (!product) 
    return null;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.title,
          price: product.price,
          imageUrl: product.image,
        });
      }
      addNotification({
        type: "success",
        message: `${product.title} added to cart successfully!`,
      });
      setQuantity(1);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate("/products")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>

      <div className="grid grid-cols-2 gap-16 max-w-[1200px] mx-auto">
        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-[4/5] flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-gray-900">{product.title}</h1>

          <div className="text-3xl mb-2 text-gray-900">
            ${product.price.toFixed(2)}
          </div>

          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <span>⭐ {product.rating.rate.toFixed(1)}</span>
            <span>·</span>
            <span>{product.rating.count} reviews</span>
          </div>

          <p className="text-gray-600 mb-4 capitalize">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <label className="block mb-3 text-gray-900">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={handleDecrease}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl w-12 text-center text-gray-900">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-900 text-white py-4 px-8 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
