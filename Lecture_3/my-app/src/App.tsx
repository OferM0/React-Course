import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ProductsPage } from "./pages/Products";
import { ProductDetailPage } from "./pages/ProductDetail";
import { ToastHost } from "./components/ToastHost";
import { Header } from "./components/Header";
import { CartDrawer } from "./components/CartDrawer";
import { useCartStore } from "./stores/cartStore";
import useLocalStorage from "./hooks/useLocalStorage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function GlobalFetchingIndicator() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gray-900 animate-pulse"
        style={{ width: "50%" }}
      ></div>
    </div>
  );
}

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useLocalStorage(
    "cart-drawer-open",
    false
  );
  const {
    items: cartItems,
    updateQuantity,
    removeItem,
    getTotalItemCount,
  } = useCartStore();

  const navigate = useNavigate();
  const location = useLocation();

  const currentView =
    location.pathname === "/products" ? "products" : "product-detail";

  const handleNavigate = (view: "products" | "product-detail") => {
    if (view === "products") {
      navigate("/products");
    }
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const totalItemCount = getTotalItemCount();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <GlobalFetchingIndicator />

      <Header
        cartItemCount={totalItemCount}
        onCartClick={() => setIsCartOpen(true)}
        currentView={currentView}
        onNavigate={handleNavigate}
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
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <ToastHost />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
