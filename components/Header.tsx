'use client';

import { Sun, Moon, MapPin } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  isScrolled: boolean;
  onToggleTheme: () => void;
}

export default function Header({ theme, isScrolled, onToggleTheme }: HeaderProps) {
  return (
    <header className={`transition-all duration-300 ${
      isScrolled 
        ? theme === 'dark'
          ? 'bg-black/90 backdrop-blur-2xl shadow-2xl shadow-orange-500/10 border-b border-gray-800'
          : 'bg-white/90 backdrop-blur-2xl shadow-2xl border-b border-gray-200'
        : theme === 'dark'
          ? 'bg-[#0a0a0a] border-b border-gray-900'
          : 'bg-white border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="text-3xl md:text-4xl transform hover:rotate-12 transition-transform duration-300 cursor-pointer">
                🍕
              </div>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-500">
                Depizza Town
              </h1>
              <div className={`flex items-center gap-1 text-[9px] md:text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <MapPin className="w-2 h-2 md:w-2.5 md:h-2.5" />
                <span className="hidden sm:inline">Gulshan-e-Iqbal, Karachi</span>
                <span className="sm:hidden">Karachi</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 md:gap-1.5">
            {/* Location Button */}
            <a
              href="https://maps.google.com/?q=Gulshan-e-Iqbal,Karachi"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 md:p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white' 
                  : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
              }`}
              aria-label="View Location"
            >
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/depizzatown"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 md:p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
              }`}
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@depizzatown"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 md:p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-700' 
                  : 'bg-black hover:bg-gray-800 text-white'
              }`}
              aria-label="TikTok"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 md:p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-gray-700 text-orange-400' 
                  : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
