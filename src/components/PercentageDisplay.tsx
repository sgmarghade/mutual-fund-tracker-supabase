import React from 'react';
import { getPercentageColor } from '../utils/percentage/colors';
import { calculateDownFromPeak, calculateChangeFromBuying } from '../utils/percentage/calculations';

interface PercentageDisplayProps {
  currentValue: number;
  peakValue?: number;
  buyingValue?: number | null;
  showBuyingChange?: boolean;
  className?: string;
}

export function PercentageDisplay({ 
  currentValue, 
  peakValue,
  buyingValue,
  showBuyingChange = false,
  className = '' 
}: PercentageDisplayProps) {
  if (showBuyingChange && buyingValue) {
    const changePercent = calculateChangeFromBuying(currentValue, buyingValue);
    const colorClass = changePercent >= 0 ? 'text-green-600' : getPercentageColor(-changePercent);
    return (
      <span className={`${colorClass} ${className}`}>
        {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
      </span>
    );
  }

  if (peakValue) {
    const downPercent = calculateDownFromPeak(currentValue, peakValue);
    return (
      <span className={`${getPercentageColor(downPercent)} ${className}`}>
        {downPercent.toFixed(2)}%
      </span>
    );
  }

  return null;
}