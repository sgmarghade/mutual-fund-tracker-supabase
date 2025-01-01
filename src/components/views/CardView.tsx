import React from 'react';
import { MutualFund } from '../../types/mutual-fund';
import { FundCard } from '../FundCard';

interface CardViewProps {
  funds: MutualFund[];
  onDelete: (id: string) => Promise<void>;
  onUpdateFundDetails: (id: string, avgBuyingNav: number, totalUnits: number, lastBuyingNav: number) => Promise<void>;
}

export function CardView({ funds, onDelete, onUpdateFundDetails }: CardViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {funds.map((fund) => (
        <FundCard
          key={fund.id}
          fund={fund}
          onDelete={onDelete}
          onUpdateFundDetails={onUpdateFundDetails}
        />
      ))}
    </div>
  );
}