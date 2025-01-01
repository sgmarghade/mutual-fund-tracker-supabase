import React from 'react';
import { LayoutList, LayoutGrid } from 'lucide-react';

interface ViewToggleProps {
  view: 'list' | 'card';
  onViewChange: (view: 'list' | 'card') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-white rounded-md shadow p-1">
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded ${
          view === 'list'
            ? 'bg-indigo-100 text-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-label="List view"
      >
        <LayoutList className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('card')}
        className={`p-2 rounded ${
          view === 'card'
            ? 'bg-indigo-100 text-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-label="Card view"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
    </div>
  );
}