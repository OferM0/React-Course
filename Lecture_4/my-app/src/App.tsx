import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import { AppRouter } from "./layouts/MainLayout";

export default function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryProvider>
  );
}