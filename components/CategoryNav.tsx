'use client';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryNavProps {
  theme: 'light' | 'dark';
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryNav({
  theme,
  categories,
  selectedCategory,
  onCategoryChange
}: CategoryNavProps) {
  return (
    <nav className={`transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-900' 
        : 'bg-white/95 backdrop-blur-xl border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="category-scroll flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => onCategoryChange('all')}
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
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
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
  );
}
