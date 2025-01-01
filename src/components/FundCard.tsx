import React, { useState } from 'react';
import { MutualFund } from '../types/mutual-fund';
import { DeleteButton } from './DeleteButton';
import { PercentageDisplay } from './PercentageDisplay';
import { EditBuyingNavModal } from './EditBuyingNavModal';
import { PencilIcon } from 'lucide-react';

interface FundCardProps {
  fund: MutualFund;
  onDelete: (id: string) => Promise<void>;
  onUpdateFundDetails: (id: string, avgBuyingNav: number, totalUnits: number, lastBuyingNav: number) => Promise<void>;
}

export function FundCard({ fund, onDelete, onUpdateFundDetails }: FundCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {fund.scheme_name}
          </h3>
          <p className="text-sm text-gray-500 mb-4">Code: {fund.scheme_code}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-indigo-600 hover:text-indigo-900 p-1"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <DeleteButton 
            onDelete={() => onDelete(fund.id)}
            className="text-red-600 hover:text-red-900 p-1"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-sm text-gray-500">Current NAV</p>
            <p className="text-lg font-semibold">₹{fund.current_nav.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Down from Peak NAV</p>
            <p className="text-lg font-semibold">
              <PercentageDisplay 
                currentValue={fund.current_nav}
                peakValue={fund.peak_nav}
              />
            </p>
          </div>
        </div>
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-sm">
              {new Date(fund.last_updated).toLocaleString()}
            </p>
          </div>
          {fund.avg_buying_nav && (
            <div className="text-right">
              <p className="text-sm text-gray-500">Change from AVG NAV(Buy)</p>
              <p className="text-lg font-semibold">
                <PercentageDisplay 
                  currentValue={fund.current_nav}
                  buyingValue={fund.avg_buying_nav}
                  showBuyingChange
                />
              </p>
            </div>
          )}
        </div>
      </div>

      <EditBuyingNavModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(avgBuyingNav, totalUnits, lastBuyingNav) => 
          onUpdateFundDetails(fund.id, avgBuyingNav, totalUnits, lastBuyingNav)
        }
        currentAvgBuyingNav={fund.avg_buying_nav}
        currentTotalUnits={fund.total_units}
        currentLastBuyingNav={fund.last_buying_nav}
        schemeName={fund.scheme_name}
      />
    </div>
  );
}