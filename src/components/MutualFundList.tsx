import React, { useEffect, useState } from 'react';
import { SearchInput } from './SearchInput';
import { ViewToggle } from './ViewToggle';
import { RefreshButton } from './RefreshButton';
import { EditBuyingNavModal } from './EditBuyingNavModal';
import { ListView } from './views/ListView';
import { CardView } from './views/CardView';
import { searchMutualFunds } from '../lib/api';
import { useMutualFunds } from '../hooks/useMutualFunds';
import { MutualFund } from '../types/mutual-fund';
import toast from 'react-hot-toast';

export function MutualFundList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'list' | 'card'>('card'); // Changed default to 'card'
  const [editingFund, setEditingFund] = useState<MutualFund | null>(null);
  const { funds, isAdding, fetchFunds, addFund, deleteFund, refreshFunds, updateFundDetails } = useMutualFunds();

  useEffect(() => {
    fetchFunds();
  }, [fetchFunds]);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        setLoading(true);
        try {
          const results = await searchMutualFunds(searchQuery.toUpperCase());
          setSearchResults(results);
        } catch (error) {
          toast.error('Failed to search mutual funds');
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 1000);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const handleAddFund = async (scheme) => {
    await addFund(scheme);
    setSearchQuery('');
  };

  const handleUpdateFundDetails = async (id: string, avgBuyingNav: number, totalUnits: number, lastBuyingNav: number) => {
    await updateFundDetails(id, avgBuyingNav, totalUnits, lastBuyingNav);
    setEditingFund(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSelect={handleAddFund}
            loading={loading || isAdding}
            results={searchResults}
            disabled={isAdding}
          />
          <ViewToggle view={view} onViewChange={setView} />
          <RefreshButton onRefresh={refreshFunds} />
        </div>
      </div>

      {view === 'list' ? (
        <ListView 
          funds={funds} 
          onDelete={deleteFund}
          onEdit={setEditingFund}
        />
      ) : (
        <CardView 
          funds={funds}
          onDelete={deleteFund}
          onUpdateFundDetails={handleUpdateFundDetails}
        />
      )}

      {editingFund && (
        <EditBuyingNavModal
          isOpen={!!editingFund}
          onClose={() => setEditingFund(null)}
          onSave={(avgBuyingNav, totalUnits, lastBuyingNav) => 
            handleUpdateFundDetails(editingFund.id, avgBuyingNav, totalUnits, lastBuyingNav)
          }
          currentAvgBuyingNav={editingFund.avg_buying_nav}
          currentTotalUnits={editingFund.total_units}
          currentLastBuyingNav={editingFund.last_buying_nav}
          schemeName={editingFund.scheme_name}
        />
      )}
    </div>
  );
}