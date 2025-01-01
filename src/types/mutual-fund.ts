export interface MutualFund {
  id: string;
  scheme_code: string;
  scheme_name: string;
  current_nav: number;
  peak_nav: number;
  last_buying_nav: number | null;
  avg_buying_nav: number | null;
  total_units: number | null;
  last_updated: string;
}