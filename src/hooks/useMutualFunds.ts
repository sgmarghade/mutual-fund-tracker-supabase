import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { MutualFundScheme, fetchMutualFundNav } from '../lib/api';
import { MutualFund } from '../types/mutual-fund';
import { calculateDownFromPeak } from '../utils/percentage/calculations';

export function useMutualFunds() {
  const [funds, setFunds] = useState<MutualFund[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const fetchFunds = useCallback(async () => {
    const { data, error } = await supabase
      .from('mutual_funds')
      .select('*')
      .order('current_nav', { ascending: true });

    if (error) {
      toast.error('Failed to fetch mutual funds');
      return;
    }

    // Sort by down from peak percentage
    const sortedFunds = data.sort((a, b) => {
      const aDownFromPeak = calculateDownFromPeak(a.current_nav, a.peak_nav);
      const bDownFromPeak = calculateDownFromPeak(b.current_nav, b.peak_nav);
      return bDownFromPeak - aDownFromPeak;
    });
    setFunds(sortedFunds);
  }, []);

  const addFund = useCallback(async (scheme: MutualFundScheme) => {
    if (isAdding) return;
    
    setIsAdding(true);
    try {
      const { currentNav, peakNav } = await fetchMutualFundNav(scheme.schemeCode);
      const { data: userData } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('mutual_funds').insert({
        user_id: userData?.user?.id,
        scheme_code: scheme.schemeCode,
        scheme_name: scheme.schemeName,
        current_nav: currentNav,
        peak_nav: peakNav,
        last_updated: new Date().toISOString(),
      });

      if (error) throw error;
      
      toast.success('Mutual fund added successfully');
      await fetchFunds();
    } catch (error) {
      toast.error('Failed to add mutual fund');
    } finally {
      setIsAdding(false);
    }
  }, [isAdding, fetchFunds]);

  const deleteFund = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('mutual_funds')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete mutual fund');
      return;
    }

    toast.success('Mutual fund deleted');
    await fetchFunds();
  }, [fetchFunds]);

  const updateFundDetails = useCallback(async (
    id: string, 
    avgBuyingNav: number, 
    totalUnits: number,
    lastBuyingNav: number
  ) => {
    console.log('Saving last nav '+lastBuyingNav);
    const { error } = await supabase
      .from('mutual_funds')
      .update({ 
        avg_buying_nav: avgBuyingNav,
        total_units: totalUnits,
        last_buying_nav: lastBuyingNav
      })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update fund details');
      return;
    }

    toast.success('Fund details updated');
    await fetchFunds();
  }, [fetchFunds]);

  const refreshFunds = useCallback(async () => {
    const refreshPromises = funds.map(async (fund) => {
      try {
        const { currentNav, peakNav } = await fetchMutualFundNav(fund.scheme_code);
        const { error } = await supabase
          .from('mutual_funds')
          .update({
            current_nav: currentNav,
            peak_nav: peakNav,
            last_updated: new Date().toISOString(),
          })
          .eq('id', fund.id);

        if (error) throw error;
      } catch (error) {
        console.error(`Failed to refresh fund ${fund.scheme_code}:`, error);
        return false;
      }
      return true;
    });

    const results = await Promise.all(refreshPromises);
    const successCount = results.filter(Boolean).length;
    
    if (successCount === funds.length) {
      toast.success('All funds refreshed successfully');
    } else if (successCount > 0) {
      toast.warning(`${successCount} out of ${funds.length} funds refreshed`);
    } else {
      toast.error('Failed to refresh funds');
    }

    await fetchFunds();
  }, [funds, fetchFunds]);

  return {
    funds,
    isAdding,
    fetchFunds,
    addFund,
    deleteFund,
    refreshFunds,
    updateFundDetails,
  };
}