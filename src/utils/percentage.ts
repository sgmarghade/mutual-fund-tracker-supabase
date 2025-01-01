export function getPercentageColor(percentage: number): string {
  if (percentage <= 5) return 'text-yellow-600';
  if (percentage <= 10) return 'text-orange-600';
  return 'text-red-600';
}