import React, { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  className?: string;
}

export function DeleteButton({ onDelete, className = '' }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`${className} disabled:opacity-50`}
      aria-label="Delete fund"
    >
      {isDeleting ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Trash2 className="w-5 h-5" />
      )}
    </button>
  );
}