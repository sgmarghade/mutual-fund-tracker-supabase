export function calculateDownFromPeak(currentValue: number, peakValue: number): number {
  return (1 - currentValue / peakValue) * 100;
}

export function calculateChangeFromBuying(currentValue: number, buyingValue: number): number {
  return ((currentValue / buyingValue - 1) * 100);
}