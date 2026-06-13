'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ProductModalProps {
  theme: 'light' | 'dark';
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    size?: string;
    categoryName: string;
    categoryIcon: string;
    nutrition?: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      servingSize: string;
    };
    ingredients?: string[];
    allergens?: string[];
  } | null;
}

export default function ProductModal({
  theme,
  isOpen,
  onClose,
  product
}: ProductModalProps) {
  if (!product) return null;

  // Default nutrition data if not provided
  const nutrition = product.nutrition || {
    calories: Math.floor(Math.random() * 400) + 300,
    protein: Math.floor(Math.random() * 30) + 10,
    carbs: Math.floor(Math.random() * 50) + 20,
    fat: Math.floor(Math.random() * 25) + 5,
    servingSize: '1 serving'
  };

  const ingredients = product.ingredients || [
    'Premium Quality Flour',
    'Fresh Vegetables',
    'Special Sauce',
    'Mozzarella Cheese',
    'Italian Herbs'
  ];

  const allergens = product.allergens || ['Gluten', 'Dairy', 'Eggs'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-3xl p-0 overflow-hidden border-0 ${
        theme === 'dark' 
          ? 'bg-[#0a0a0a]' 
          : 'bg-white'
      }`}>
        <div className="max-h-[85vh] overflow-y-auto scrollbar-hide">
          {/* Product Image */}
          <div className="relative h-56 bg-gradient-to-br from-orange-400 via-red-500 to-orange-600 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl filter drop-shadow-2xl animate-float">
                {product.categoryIcon}
              </span>
            </div>
            {product.size && (
              <div className="absolute top-3 left-4">
                <Badge className="bg-white/20 text-white backdrop-blur-md border border-white/30 px-3 py-1 text-sm hover:bg-white/20">
                  {product.size}
                </Badge>
              </div>
            )}
          </div>

          <div className="p-5 md:p-6">
            <DialogHeader className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className={`text-2xl md:text-3xl font-bold leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.name}
                </DialogTitle>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Rs. {product.price}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={
                  theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'
                }>
                  {product.categoryName}
                </Badge>
                <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20">
                  Available Now
                </Badge>
              </div>
            </DialogHeader>

            <DialogDescription className={`text-sm md:text-base leading-relaxed mt-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {product.description}
            </DialogDescription>

            {/* Nutrition Information */}
            <div className="mt-6">
              <h3 className={`text-lg font-bold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Nutrition Facts
              </h3>
              <div className={`text-xs mb-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Per {nutrition.servingSize}
              </div>
              <div className={`rounded-xl p-4 ${
                theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-50'
              }`}>
                <div className="space-y-4">
                  {/* Calories */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Calories
                      </span>
                      <span className="text-base font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        {nutrition.calories}
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((nutrition.calories / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Protein */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Protein
                      </span>
                      <span className={`text-base font-bold ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {nutrition.protein}g
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                    }`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min((nutrition.protein / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Carbs */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Carbs
                      </span>
                      <span className={`text-base font-bold ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {nutrition.carbs}g
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                    }`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          theme === 'dark' ? 'bg-green-400' : 'bg-green-600'
                        }`}
                        style={{ width: `${Math.min((nutrition.carbs / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Fat */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Fat
                      </span>
                      <span className={`text-base font-bold ${
                        theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                      }`}>
                        {nutrition.fat}g
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                    }`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          theme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-600'
                        }`}
                        style={{ width: `${Math.min((nutrition.fat / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mt-5">
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Made With
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`text-xs py-1.5 px-3 ${
                      theme === 'dark' 
                        ? 'border-gray-700 text-gray-300 bg-[#1a1a1a]' 
                        : 'border-gray-300 text-gray-700 bg-gray-50'
                    }`}
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
