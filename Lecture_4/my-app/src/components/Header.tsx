import { ShoppingCart, Sun, Moon, Languages } from "lucide-react";
//import { useThemeStore } from "../stores";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  currentView: "products" | "product-detail";
  onNavigate: (view: "products" | "product-detail") => void;
}

export function Header({  cartItemCount, onCartClick, currentView, onNavigate }: HeaderProps) {
  //const { theme, toggleTheme } = useThemeStore();
  const { t, i18n } = useTranslation('common');
  const [theme, setTheme] = useLocalStorage<string>("primereact-theme-name", "lara-light-blue");
  
  useEffect(() => {
    const themeLink = document.getElementById('primereact-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `/themes/${theme}/theme.css`;
    }

    if (theme.includes('dark')) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('app-language', newLang);
  };

  const toggleTheme = () => {
    const newTheme = theme === "lara-light-blue" ? "lara-dark-blue" : "lara-light-blue";
    setTheme(newTheme);
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
      <div className="max-w-[1440px] mx-auto px-12 py-6">
        <div className="flex items-center justify-between">

          <button
            onClick={() => onNavigate("products")}
            className="text-2xl font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {t('logo')}
          </button>

          <div className="flex items-center gap-8">
            <nav className="flex gap-8">
              <button
                onClick={() => onNavigate("products")}
                className={`transition-colors ${
                  currentView === "products"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {t('nav.shop')}
              </button>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {t('nav.about')}
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {t('nav.contact')}
              </a>
            </nav>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <Languages className="w-5 h-5" />
              {i18n.language === 'en' ? 'HE' : 'EN'}
            </button>

            {/* <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button> */}
            
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              title="Switch PrimeReact Theme"
            >
              {theme.includes('dark') ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" />
              )}
            </button>

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
