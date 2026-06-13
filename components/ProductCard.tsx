'use client';

import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  theme: 'light' | 'dark';
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    size?: string;
    categoryName: string;
    categoryIcon: string;
  };
  index: number;
  onClick: () => void;
}

export default function ProductCard({ theme, item, index, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group rounded-2xl overflow-hidden cursor-pointer
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
            View Details
          </Badge>
        </div>
      </div>
    </div>
  );
}
