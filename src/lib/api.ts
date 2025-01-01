export interface MutualFundScheme {
  schemeCode: string;
  schemeName: string;
}

interface NavDataEntry {
  date: string;
  nav: string;
}

interface NavResponse {
  data: NavDataEntry[];
}

export async function searchMutualFunds(query: string): Promise<MutualFundScheme[]> {
  if (!query || query.length < 3) return [];
  
  try {
    const response = await fetch(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to fetch mutual funds');
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to search mutual funds');
  }
}

export async function fetchMutualFundNav(schemeCode: string): Promise<{ currentNav: number; peakNav: number }> {
  try {
    const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
    if (!response.ok) throw new Error('Failed to fetch NAV data');
    
    const { data }: NavResponse = await response.json();
    if (!data?.length) throw new Error('No NAV data available');

    const currentNav = parseFloat(data[0].nav);
    const peakNav = data.reduce((max, entry) => {
      const nav = parseFloat(entry.nav);
      return nav > max ? nav : max;
    }, currentNav);

    return { currentNav, peakNav };
  } catch (error) {
    console.error('NAV fetch error:', error);
    throw new Error('Failed to fetch NAV data');
  }
}