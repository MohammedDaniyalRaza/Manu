'use client';

import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  theme: 'light' | 'dark';
  searchQuery: string;
  searchResults: Array<{
    id: number;
    name: string;
    categoryName: string;
    categoryIcon: string;
    price: number;
  }>;
  showSuggestions: boolean;
  onSearchChange: (value: string) => void;
  onSuggestionClick: (item: any) => void;
  onClearSearch: () => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function SearchBar({
  theme,
  searchQuery,
  searchResults,
  showSuggestions,
  onSearchChange,
  onSuggestionClick,
  onClearSearch,
  onFocus,
  onKeyDown
}: SearchBarProps) {
  return (
    <div className={`transition-all duration-300 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
    }`}>
      <div className="relative max-w-2xl mx-auto search-container px-4 py-4">
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <Input
            type="text"
            placeholder="Search for pizzas, burgers, drinks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            className={`w-full pl-12 pr-12 py-6 text-base rounded-2xl transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-[#1a1a1a] border-gray-800 focus:border-orange-500 focus:ring-orange-500/50 text-white placeholder:text-gray-500'
                : 'bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500/50 text-gray-900 placeholder:text-gray-400'
            }`}
          />
          {searchQuery && (
            <button
              onClick={onClearSearch}
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
          <div className={`absolute top-full left-4 right-4 mt-2 rounded-2xl overflow-hidden shadow-2xl z-50 ${
            theme === 'dark' 
              ? 'bg-[#1a1a1a] border border-gray-800' 
              : 'bg-white border border-gray-200'
          }`}>
            {searchResults.map((item) => (
              <button
                key={item.id}
                onClick={() => onSuggestionClick(item)}
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
  );
}
