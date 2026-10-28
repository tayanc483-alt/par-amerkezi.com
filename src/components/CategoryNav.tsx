import React from 'react';
import { ApplianceCategory } from '../types';
import { CATEGORIES_CONFIG } from '../data/partsData';
import { WashingMachine, Utensils, Refrigerator, Flame, Wind, Sparkles, LayoutGrid } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: ApplianceCategory;
  onSelectCategory: (category: ApplianceCategory) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'WashingMachine':
        return <WashingMachine className="w-4 h-4" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4" />;
      case 'Refrigerator':
        return <Refrigerator className="w-4 h-4" />;
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      case 'Wind':
        return <Wind className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 py-3 sticky top-[57px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES_CONFIG.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <span className={isActive ? 'text-blue-400' : 'text-slate-400'}>
                  {getIcon(cat.icon)}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
