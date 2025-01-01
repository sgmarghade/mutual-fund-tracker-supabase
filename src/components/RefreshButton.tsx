import React, { useState } from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
  className?: string;
}

export function RefreshButton({ onRefresh, className = '' }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ${className}`}
      aria-label="Refresh fund data"
    >
      {isRefreshing ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <RefreshCw className="w-4 h-4 mr-2" />
      )}
      Refresh
    </button>
  );
}