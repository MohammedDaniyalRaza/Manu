'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import menuData from '@/data/menu.json';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X, Sun, Moon, MapPin } from 'lucide-react';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  size?: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
};

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const savedTheme = localStorage.getItem('depizza-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('depizza-theme', newTheme);
  };

  // Search functionality with suggestions
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results: Array<MenuItem & { categoryName: string; categoryIcon: string; categoryId: string }> = [];
    
    menuData.categories.forEach(category => {
      category.items.forEach(item => {
        if (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        ) {
          results.push({
            ...item,
            categoryName: category.name,
            categoryIcon: category.icon,
            categoryId: category.id
          });
        }
      });
    });
    
    return results.slice(0, 6);
  }, [searchQuery]);

  // Filter items based on category and search
  const displayItems = useMemo(() => {
    if (searchQuery.trim()) {
      return searchResults;
    }
    
    if (selectedCategory === 'all') {
      const allItems: Array<MenuItem & { categoryName: string; categoryIcon: string; categoryId: string }> = [];
      menuData.categories.forEach(category => {
        category.items.forEach(item => {
          allItems.push({
            ...item,
            categoryName: category.name,
            categoryIcon: category.icon,
            categoryId: category.id
          });
        });
      });
      return allItems;
    }
    
    const category = menuData.categories.find(cat => cat.id === selectedCategory);
    return category?.items.map(item => ({
      ...item,
      categoryName: category.name,
      categoryIcon: category.icon,
      categoryId: category.id
    })) || [];
  }, [selectedCategory, searchQuery, searchResults]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
    setShowSuggestions(false);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuggestionClick = (item: any) => {
    setSearchQuery(item.name);
    setSelectedCategory(item.categoryId);
    setShowSuggestions(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      if (searchResults.length > 0) {
        setSelectedCategory(searchResults[0].categoryId);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-24 h-24 border-8 border-orange-200 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 animate-pulse">
            🍕 Depizza Town
          </h1>
          <p className="text-white/90 text-lg">Preparing your delicious menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0a0a0a] text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-gray-50 text-gray-900'
    }`}>
      
      {/* Premium Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark'
            ? 'bg-black/90 backdrop-blur-2xl shadow-2xl shadow-orange-500/10 border-b border-gray-800'
            : 'bg-white/90 backdrop-blur-2xl shadow-2xl border-b border-gray-200'
          : theme === 'dark'
            ? 'bg-[#0a0a0a] border-b border-gray-900'
            : 'bg-white border-b border-gray-200'
      }`}>
        <div className="container mx-auto px-4 py-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative">
                <div className="text-4xl md:text-5xl transform hover:rotate-12 transition-transform duration-300 cursor-pointer">
                  🍕
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-500">
                  Depizza Town
                </h1>
                <div className={`flex items-center gap-1 text-[10px] md:text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  <span className="hidden sm:inline">Gulshan-e-Iqbal, Karachi</span>
                  <span className="sm:hidden">Karachi</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Instagram */}
              <a
                href="https://instagram.com/depizzatown"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 md:p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white' 
                    : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@depizzatown"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 md:p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-700' 
                    : 'bg-black hover:bg-gray-800 text-white'
                }`}
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 md:p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700 text-orange-400' 
                    : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto search-container">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <Input
                type="text"
                placeholder="Search for pizzas, burgers, drinks..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleSearchKeyDown}
                className={`w-full pl-12 pr-12 py-6 text-base rounded-2xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#1a1a1a] border-gray-800 focus:border-orange-500 focus:ring-orange-500/50 text-white placeholder:text-gray-500'
                    : 'bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500/50 text-gray-900 placeholder:text-gray-400'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                    theme === 'dark' 
                      ? 'hover:bg-gray-800 text-gray-400' 
                      : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchQuery && searchResults.length > 0 && (
              <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden shadow-2xl z-50 ${
                theme === 'dark' 
                  ? 'bg-[#1a1a1a] border border-gray-800' 
                  : 'bg-white border border-gray-200'
              }`}>
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSuggestionClick(item)}
                    className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-gray-800'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{item.categoryIcon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {item.categoryName}
                      </div>
                    </div>
                    <span className="font-bold text-orange-500">Rs. {item.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Category Navigation with Custom Scrollbar */}
      <nav className={`sticky top-[140px] md:top-[148px] z-40 transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-900' 
          : 'bg-white/95 backdrop-blur-xl border-b border-gray-200'
      }`}>
        <div className="container mx-auto px-2 py-4">
          <div className="category-scroll flex gap-2 overflow-x-auto pb-3">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap
                transition-all duration-300 font-medium text-sm
                transform hover:scale-105
                ${selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50'
                  : theme === 'dark'
                    ? 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span className="text-lg">🔥</span>
              <span>All Items</span>
            </button>
            {menuData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap
                  transition-all duration-300 font-medium text-sm
                  transform hover:scale-105
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50'
                    : theme === 'dark'
                      ? 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu Items */}
      <main ref={mainRef} className="flex-1 container mx-auto px-4 py-8 mb-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {searchQuery ? `Search Results (${displayItems.length})` : selectedCategory === 'all' ? 'All Menu Items' : menuData.categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
        </div>

        {displayItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No items found</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Try searching for something else
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {displayItems.map((item, index) => (
              <div
                key={item.id}
                className={`
                  group rounded-2xl overflow-hidden
                  transition-all duration-500 hover:scale-105
                  transform hover:-translate-y-2
                  ${theme === 'dark'
                    ? 'bg-[#1a1a1a] shadow-xl shadow-black/50 hover:shadow-orange-500/20'
                    : 'bg-white shadow-xl hover:shadow-2xl'
                  }
                  animate-slide-up
                `}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Image */}
                <div className="relative h-36 md:h-48 bg-gradient-to-br from-orange-400 via-red-500 to-orange-600 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl md:text-7xl filter drop-shadow-2xl transform group-hover:scale-125 transition-transform duration-500">
                      {item.categoryIcon}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/60 text-white backdrop-blur-sm text-xs md:text-base px-2 md:px-3 py-1 hover:bg-black/60">
                      Rs. {item.price}
                    </Badge>
                  </div>
                  {item.size && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-orange-500 text-white text-xs px-2 py-1 hover:bg-orange-500">
                        {item.size}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-3 md:p-5">
                  <div className="mb-2 md:mb-3">
                    <h3 className={`text-base md:text-xl font-bold mb-1 md:mb-2 line-clamp-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.name}
                    </h3>
                    <Badge variant="outline" className={`text-xs ${
                      theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-600'
                    }`}>
                      {item.categoryName}
                    </Badge>
                  </div>
                  
                  <p className={`text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>

                  <div className={`flex items-center justify-between pt-3 md:pt-4 border-t ${
                    theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      Rs. {item.price}
                    </span>
                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20 text-xs">
                      Available
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Professional Footer */}
      <footer className={`mt-auto border-t transition-colors duration-300 py-8 ${
        theme === 'dark' 
          ? 'bg-[#0a0a0a] border-gray-900' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <div className="text-4xl mb-3">🍕</div>
          <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
            Depizza Town
          </h3>
          <p className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Gulshan-e-Iqbal, Karachi, Pakistan
          </p>
          <div className={`h-px w-32 mx-auto mb-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'
          }`}></div>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            © 2024 Depizza Town. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }

        /* Custom Premium Scrollbar */
        .category-scroll::-webkit-scrollbar {
          height: 8px;
        }
        
        .category-scroll::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? 'rgba(26, 26, 26, 0.5)' : 'rgba(0, 0, 0, 0.05)'};
          border-radius: 10px;
          margin: 0 10px;
        }
        
        .category-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #f97316, #ef4444);
          border-radius: 10px;
          border: 2px solid ${theme === 'dark' ? '#0a0a0a' : '#ffffff'};
        }
        
        .category-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to right, #ea580c, #dc2626);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Line clamp utilities */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
