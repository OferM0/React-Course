import "./index.css";
import App from "./App.tsx";
import About from "./Pages/About.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />, // Your home page
//   },
//   {
//     path: "/about",
//     element: <About />, // Your about page
//   },
//   {
//     path: "*",
//     element: <h1>404 - Page Not Found</h1>,
//   },
// ]);

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );
