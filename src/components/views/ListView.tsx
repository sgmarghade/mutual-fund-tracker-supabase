import React from 'react';
import { MutualFund } from '../../types/mutual-fund';
import { DeleteButton } from '../DeleteButton';
import { PercentageDisplay } from '../PercentageDisplay';
import { Pencil } from 'lucide-react';

interface ListViewProps {
  funds: MutualFund[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (fund: MutualFund) => void;
}

export function ListView({ funds, onDelete, onEdit }: ListViewProps) {
  return (
    <div className="overflow-x-auto">
      <div className="bg-white rounded-lg shadow overflow-hidden min-w-full">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scheme Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current NAV
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Down from Peak
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Change from AVG NAV(Buy)              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {funds.map((fund) => (
              <tr key={fund.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {fund.scheme_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {fund.scheme_code}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ₹{fund.current_nav.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PercentageDisplay 
                    currentValue={fund.current_nav} 
                    peakValue={fund.peak_nav}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {fund.avg_buying_nav && (
                    <PercentageDisplay 
                      currentValue={fund.current_nav}
                      buyingValue={fund.avg_buying_nav}
                      showBuyingChange
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(fund.last_updated).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onEdit(fund)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <DeleteButton 
                      onDelete={() => onDelete(fund.id)}
                      className="text-red-600 hover:text-red-900"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}