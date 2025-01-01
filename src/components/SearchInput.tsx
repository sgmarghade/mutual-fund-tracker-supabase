import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { MutualFundScheme } from '../lib/api';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (scheme: MutualFundScheme) => void;
  loading: boolean;
  results: MutualFundScheme[];
  disabled?: boolean;
}

export function SearchInput({ 
  value, 
  onChange, 
  onSelect, 
  loading, 
  results,
  disabled 
}: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    onChange(newValue);
    setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search mutual funds..."
          disabled={disabled}
          className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm uppercase disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {results.map((scheme) => (
            <button
              key={scheme.schemeCode}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => {
                onSelect(scheme);
                setIsOpen(false);
              }}
              disabled={disabled}
            >
              <p className="text-sm font-medium text-gray-900">{scheme.schemeName}</p>
              <p className="text-sm text-gray-500">Code: {scheme.schemeCode}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}