import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { FetchingIndicator } from "./components/FetchingIndicator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 30 seconds
      staleTime: 30 * 1000,
      // Try to refetch data in the background if it becomes stale
      refetchOnWindowFocus: true,
      // Cache data for 5 minutes before garbage collection
      gcTime: 5 * 60 * 1000,
      // Retry failed queries 3 times
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchingIndicator />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
