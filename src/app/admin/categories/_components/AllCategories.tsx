'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface CategoryGridProps {
  categories?: Category[];
  onDelete?: (id: string) => void;
}

export function AllCategories({
  categories = [
    { id: '1', name: 'Skatewear' },
    { id: '2', name: 'Shoe' },
    { id: '3', name: 'Shoe' },
    { id: '4', name: 'Shoe' },
    { id: '5', name: 'Skatewear' },
    { id: '6', name: 'Shoe' },
    { id: '7', name: 'Shoe' },
    { id: '8', name: 'Shoe' },
    { id: '9', name: 'Skatewear' },
    { id: '10', name: 'Shoe' },
    { id: '11', name: 'Shoe' },
    { id: '12', name: 'Shoe' },
    { id: '13', name: 'Skatewear' },
    { id: '14', name: 'Shoe' },
    { id: '15', name: 'Shoe' },
    { id: '16', name: 'Shoe' },
    { id: '17', name: 'Skatewear' },
    { id: '18', name: 'Shoe' },
    { id: '19', name: 'Shoe' },
    { id: '20', name: 'Shoe' },
  ],
  onDelete = (id) => console.log(`Delete category: ${id}`),
}: CategoryGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [items, setItems] = useState<Category[]>(categories);

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    onDelete(id);
  };

  return (
    <div className="w-full bg-zinc-900 p-4 rounded-md">
      <div className="grid grid-cols-4 gap-4">
        {items.map((category) => (
          <div
            key={category.id}
            onMouseEnter={() => setHoveredId(category.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative group"
          >
            <button
              className="w-full px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center text-sm font-medium"
            >
              {category.name}
            </button>
            
            {hoveredId === category.id && (
              <button
                onClick={() => handleDelete(category.id)}
                className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition-colors duration-200 shadow-lg"
                aria-label={`Delete ${category.name}`}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
