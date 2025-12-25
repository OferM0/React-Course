import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Header, CartDrawer, GlobalFetchingIndicator, ToastHost } from "../components";
import { ProductDetailPage, ProductsTablePage } from "../pages";
import { useCartStore } from "../stores";
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
          <Route path="/products" element={<ProductsTablePage />} />
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