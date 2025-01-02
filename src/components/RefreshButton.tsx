import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { LoadingButton } from './common/LoadingButton';

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
    <LoadingButton
      onClick={handleRefresh}
      isLoading={isRefreshing}
      icon={<RefreshCw className="w-4 h-4" />}
      className={className}
      aria-label="Refresh fund data"
    >
      Refresh
    </LoadingButton>
  );
}