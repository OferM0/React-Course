import { ShoppingCart, Sun, Moon } from "lucide-react";
import { useThemeStore } from "../stores/themeStore";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  currentView: "products" | "product-detail";
  onNavigate: (view: "products" | "product-detail") => void;
}

export function Header({
  cartItemCount,
  onCartClick,
  currentView,
  onNavigate,
}: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
      <div className="max-w-[1440px] mx-auto px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("products")}
            className="text-2xl font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            ONLINE STORE
          </button>

          <div className="flex items-center gap-8">
            {/* Navigation Links */}
            <nav className="flex gap-8">
              <button
                onClick={() => onNavigate("products")}
                className={`transition-colors ${
                  currentView === "products"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Shop
              </button>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Cart Icon with Badge */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
