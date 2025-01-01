import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Loader2 } from 'lucide-react';

interface EditBuyingNavModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (avgBuyingNav: number, totalUnits: number, lastBuyingNav: number) => Promise<void>;
  currentAvgBuyingNav: number | null;
  currentTotalUnits: number | null;
  currentLastBuyingNav: number | null;
  schemeName: string;
}

export function EditBuyingNavModal({
  isOpen,
  onClose,
  onSave,
  currentAvgBuyingNav,
  currentTotalUnits,
  currentLastBuyingNav,
  schemeName,
}: EditBuyingNavModalProps) {
  const [avgBuyingNav, setAvgBuyingNav] = useState(currentAvgBuyingNav?.toString() || '');
  const [totalUnits, setTotalUnits] = useState(currentTotalUnits?.toString() || '');
  const [lastBuyingNav, setLastBuyingNav] = useState(currentLastBuyingNav?.toString() || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log('Current values:', {
      currentAvgBuyingNav,
      currentTotalUnits,
      currentLastBuyingNav,
      schemeName
    });
    setAvgBuyingNav(currentAvgBuyingNav?.toString() || '');
    setTotalUnits(currentTotalUnits?.toString() || '');
    setLastBuyingNav(currentLastBuyingNav?.toString() || '');
  }, [currentAvgBuyingNav, currentTotalUnits, currentLastBuyingNav]);

  const handleSave = async () => {
    if (!avgBuyingNav || !totalUnits || !lastBuyingNav) return;
    setIsSaving(true);
    console.log('Saving last nav '+lastBuyingNav);
    try {
      await onSave(parseFloat(avgBuyingNav), parseFloat(totalUnits), parseFloat(lastBuyingNav));
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Fund Details - ${schemeName}`}>
      <div className="space-y-6">
        <div className="space-y-5">
          <div className="grid grid-cols-[140px,180px] gap-4 items-center justify-end">
            <label htmlFor="avgBuyingNav" className="text-sm font-medium text-gray-700 text-right">
              Avg Buying NAV (₹)
            </label>
            <input
              type="number"
              id="avgBuyingNav"
              value={avgBuyingNav}
              onChange={(e) => setAvgBuyingNav(e.target.value)}
              className="block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
          
          <div className="grid grid-cols-[140px,180px] gap-4 items-center justify-end">
            <label htmlFor="lastBuyingNav" className="text-sm font-medium text-gray-700 text-right">
              Last Buying NAV (₹)
            </label>
            <input
              type="number"
              id="lastBuyingNav"
              value={lastBuyingNav}
              onChange={(e) => setLastBuyingNav(e.target.value)}
              className="block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div className="grid grid-cols-[140px,180px] gap-4 items-center justify-end">
            <label htmlFor="totalUnits" className="text-sm font-medium text-gray-700 text-right">
              Total Units
            </label>
            <input
              type="number"
              id="totalUnits"
              value={totalUnits}
              onChange={(e) => setTotalUnits(e.target.value)}
              className="block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.0000"
              step="0.0001"
              min="0"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!avgBuyingNav || !totalUnits || !lastBuyingNav || isSaving}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}