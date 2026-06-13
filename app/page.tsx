'use client';

import { useState, useEffect, useMemo } from 'react';
import menuData from '@/data/menu.json';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategoryNav from '@/components/CategoryNav';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';

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

type ExtendedMenuItem = MenuItem & {
  categoryName: string;
  categoryIcon: string;
  categoryId: string;
};

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ExtendedMenuItem | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    const savedTheme = localStorage.getItem('depizza-theme') as 'light' | 'dark';
    if (savedTheme) setTheme(savedTheme);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
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

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: Array<ExtendedMenuItem> = [];
    
    menuData.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) {
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

  const displayItems = useMemo(() => {
    if (searchQuery.trim()) return searchResults;
    
    if (selectedCategory === 'all') {
      const allItems: Array<ExtendedMenuItem> = [];
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuggestionClick = (item: ExtendedMenuItem) => {
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
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <Header theme={theme} isScrolled={isScrolled} onToggleTheme={toggleTheme} />
        
        <SearchBar
          theme={theme}
          searchQuery={searchQuery}
          searchResults={searchResults}
          showSuggestions={showSuggestions}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setShowSuggestions(true);
          }}
          onSuggestionClick={handleSuggestionClick}
          onClearSearch={() => {
            setSearchQuery('');
            setShowSuggestions(false);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleSearchKeyDown}
        />

        <CategoryNav
          theme={theme}
          categories={menuData.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Spacer to prevent content jump */}
      <div className="h-[236px]"></div>

      <main className="flex-1 container mx-auto px-4 py-8 mb-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {searchQuery 
              ? `Search Results (${displayItems.length})` 
              : selectedCategory === 'all' 
                ? 'All Menu Items' 
                : menuData.categories.find(c => c.id === selectedCategory)?.name}
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
              <ProductCard
                key={item.id}
                theme={theme}
                item={item}
                index={index}
                onClick={() => setSelectedProduct(item)}
              />
            ))}
          </div>
        )}
      </main>

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
          <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Gulshan-e-Iqbal, Karachi, Pakistan
          </p>
          <div className={`h-px w-32 mx-auto mb-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            © 2024 Depizza Town. All rights reserved.
          </p>
        </div>
      </footer>

      <ProductModal
        theme={theme}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />

      <style jsx global>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-150 { animation-delay: 150ms; }
        .category-scroll::-webkit-scrollbar { height: 8px; }
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
        html { scroll-behavior: smooth; }
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
