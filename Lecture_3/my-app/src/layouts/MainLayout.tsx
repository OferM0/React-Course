import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ProductsPage } from "../pages/Products";
import { ProductDetailPage } from "../pages/ProductDetail";
import { Header } from "../components/Header";
import { CartDrawer } from "../components/CartDrawer";
import { GlobalFetchingIndicator } from "../components/GlobalFetchingIndicator";
import { ToastHost } from "../components/ToastHost";
import { useCartStore } from "../stores/cartStore";
import useLocalStorage from "../hooks/useLocalStorage";

export function AppRouter() {
  const [isCartOpen, setIsCartOpen] = useLocalStorage("cart-drawer-open", false);
  const { items: cartItems, updateQuantity, removeItem, getTotalItemCount } = useCartStore();
  
  const navigate = useNavigate();
  const location = useLocation();

  const currentView = location.pathname === "/products" ? "products" : "product-detail";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <GlobalFetchingIndicator />

      <Header
        cartItemCount={getTotalItemCount()}
        onCartClick={() => setIsCartOpen(true)}
        currentView={currentView}
        onNavigate={(view) => view === "products" && navigate("/products")}
      />

      <main className="max-w-[1440px] mx-auto px-12 py-12">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <ToastHost />
    </div>
  );
}