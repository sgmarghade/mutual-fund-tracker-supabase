import React, { useState } from 'react';
import { PencilIcon, Loader2, Check } from 'lucide-react';

interface EditBuyingNavProps {
  currentBuyingNav: number | null;
  onSave: (buyingNav: number) => Promise<void>;
}

export function EditBuyingNav({ currentBuyingNav, onSave }: EditBuyingNavProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [value, setValue] = useState(currentBuyingNav?.toString() || '');

  const handleSave = async () => {
    if (!value) return;
    setIsSaving(true);
    try {
      await onSave(parseFloat(value));
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="text-indigo-600 hover:text-indigo-800 inline-flex items-center"
      >
        <PencilIcon className="w-4 h-4 mr-1" />
        {currentBuyingNav ? `₹${currentBuyingNav.toFixed(2)}` : 'Add buying NAV'}
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-24 px-2 py-1 border rounded text-sm"
        step="0.01"
        min="0"
        disabled={isSaving}
      />
      <button
        onClick={handleSave}
        disabled={isSaving || !value}
        className="text-green-600 hover:text-green-800 disabled:opacity-50"
      >
        {isSaving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}