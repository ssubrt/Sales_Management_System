'use client';

import { useState, useRef, useEffect } from 'react';
import { ActiveFilters, AvailableFilters } from '@/lib/types';

interface FilterBarProps {
  availableFilters: AvailableFilters;
  activeFilters: ActiveFilters;
  onFilterChange: (filters: ActiveFilters) => void;
  onClearAll: () => void;
}

interface FilterDropdownProps {
  label: string;
  count?: number;
  isActive: boolean;
  children: React.ReactNode;
}

function FilterDropdown({ label, count, isActive, children }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 px-1 py-1.5 rounded-lg border text-sm transition-colors ${
          isActive || isOpen 
            ? 'bg-gray-100 border-gray-300 text-gray-900 font-medium' 
            : 'bg-[#F3F3F3] text-[#3A3A47] border-transparent hover:bg-gray-100'
        }`}
      >
        <span>{label}</span>
        {count ? (
          <span className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full text-xs">
            {count}
          </span>
        ) : null}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2 max-h-96 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      )}
    </div>
  );
}

export default function FilterBar({ availableFilters, activeFilters, onFilterChange, onClearAll }: FilterBarProps) {
  
  const [ageError, setAgeError] = useState<string>('');
  const [minAgeInput, setMinAgeInput] = useState<string>('');
  const [maxAgeInput, setMaxAgeInput] = useState<string>('');

  const handleMultiSelectChange = (key: keyof ActiveFilters, value: string) => {
    const current = activeFilters[key] as string[];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    onFilterChange({ ...activeFilters, [key]: updated });
  };

  const validateAndApplyAgeFilter = (minStr: string, maxStr: string) => {
    setAgeError('');

    // If both are empty, clear the filter
    if (minStr === '' && maxStr === '') {
      onFilterChange({ ...activeFilters, ageRange: null });
      return;
    }

    // Parse values
    const min = minStr === '' ? availableFilters.ageRange.min : parseInt(minStr);
    const max = maxStr === '' ? availableFilters.ageRange.max : parseInt(maxStr);

    // Check for invalid numbers
    if (isNaN(min) || isNaN(max)) {
      setAgeError('Please enter valid numbers');
      return;
    }

    // Validate range
    if (min < availableFilters.ageRange.min) {
      setAgeError(`Minimum age must be at least ${availableFilters.ageRange.min}`);
      return;
    }

    if (max > availableFilters.ageRange.max) {
      setAgeError(`Maximum age must be at most ${availableFilters.ageRange.max}`);
      return;
    }

    if (min > max) {
      setAgeError('Minimum age must be less than or equal to maximum age');
      return;
    }

    // Apply the filter
    onFilterChange({ ...activeFilters, ageRange: { min, max } });
  };

  const handleMinAgeChange = (value: string) => {
    setMinAgeInput(value);
    validateAndApplyAgeFilter(value, maxAgeInput);
  };

  const handleMaxAgeChange = (value: string) => {
    setMaxAgeInput(value);
    validateAndApplyAgeFilter(minAgeInput, value);
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-3 py-2 min-w-max">
        {/* Reset Icon Button */}
        <button 
          onClick={onClearAll}
          className="p-2 hover:bg-gray-100 bg-[#F3F3F3] rounded-lg text-gray-500 transition-colors shrink-0"
          title="Reset Filters"
        >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Region Filter */}
      <FilterDropdown 
        label="Customer Region" 
        isActive={activeFilters.customerRegions.length > 0}
        count={activeFilters.customerRegions.length || undefined}
      >
        {availableFilters.regions.length > 0 ? (
          availableFilters.regions.map(region => (
            <label key={region} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.customerRegions.includes(region)}
                onChange={() => handleMultiSelectChange('customerRegions', region)}
                className="w-4 h-4 text-black rounded border-gray-300 focus:ring-0 accent-black"
              />
              <span className="ml-3 text-sm text-gray-700">{region}</span>
            </label>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">No regions available</div>
        )}
      </FilterDropdown>

      {/* Gender Filter */}
      <FilterDropdown 
        label="Gender" 
        isActive={activeFilters.genders.length > 0}
        count={activeFilters.genders.length || undefined}
      >
        {availableFilters.genders.length > 0 ? (
          availableFilters.genders.map(gender => (
            <label key={gender} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.genders.includes(gender)}
                onChange={() => handleMultiSelectChange('genders', gender)}
                className="w-4 h-4 text-black rounded border-gray-300 focus:ring-0 accent-black"
              />
              <span className="ml-3 text-sm text-gray-700">{gender}</span>
            </label>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">No genders available</div>
        )}
      </FilterDropdown>

      {/* Age Filter */}
      <FilterDropdown 
        label="Age Range" 
        isActive={!!activeFilters.ageRange}
      >
        <div className="px-4 py-2 space-y-3">
          <div>
            <label className="text-xs text-gray-500">Min Age</label>
            <input
              type="number"
              min={availableFilters.ageRange.min}
              max={availableFilters.ageRange.max}
              placeholder={`Min: ${availableFilters.ageRange.min}`}
              value={minAgeInput}
              onChange={(e) => handleMinAgeChange(e.target.value)}
              className={`w-full mt-1 border rounded px-2 py-1 text-sm ${
                ageError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-400'
              }`}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Max Age</label>
            <input
              type="number"
              min={availableFilters.ageRange.min}
              max={availableFilters.ageRange.max}
              placeholder={`Max: ${availableFilters.ageRange.max}`}
              value={maxAgeInput}
              onChange={(e) => handleMaxAgeChange(e.target.value)}
              className={`w-full mt-1 border rounded px-2 py-1 text-sm ${
                ageError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-400'
              }`}
            />
          </div>
          {ageError && (
            <div className="text-xs text-red-600 bg-red-50 px-2 py-1.5 rounded">
              {ageError}
            </div>
          )}
        </div>
      </FilterDropdown>

      {/* Product Category Filter */}
      <FilterDropdown 
        label="Product Category" 
        isActive={activeFilters.productCategories.length > 0}
        count={activeFilters.productCategories.length || undefined}
      >
        {availableFilters.categories.length > 0 ? (
          availableFilters.categories.map(category => (
            <label key={category} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.productCategories.includes(category)}
                onChange={() => handleMultiSelectChange('productCategories', category)}
                className="w-4 h-4 text-black rounded border-gray-300 focus:ring-0 accent-black"
              />
              <span className="ml-3 text-sm text-gray-700">{category}</span>
            </label>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">No categories available</div>
        )}
      </FilterDropdown>

      {/* Tags Filter */}
      <FilterDropdown 
        label="Tags" 
        isActive={activeFilters.tags.length > 0}
        count={activeFilters.tags.length || undefined}
      >
        {availableFilters.tags.length > 0 ? (
          availableFilters.tags.map(tag => (
            <label key={tag} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.tags.includes(tag)}
                onChange={() => handleMultiSelectChange('tags', tag)}
                className="w-4 h-4 text-black rounded border-gray-300 focus:ring-0 accent-black"
              />
              <span className="ml-3 text-sm text-gray-700">{tag}</span>
            </label>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">No tags available</div>
        )}
      </FilterDropdown>

      {/* Payment Method Filter */}
      <FilterDropdown 
        label="Payment Method" 
        isActive={activeFilters.paymentMethods.length > 0}
        count={activeFilters.paymentMethods.length || undefined}
      >
        {availableFilters.paymentMethods.length > 0 ? (
          availableFilters.paymentMethods.map(method => (
            <label key={method} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.paymentMethods.includes(method)}
                onChange={() => handleMultiSelectChange('paymentMethods', method)}
                className="w-4 h-4 text-black rounded border-gray-300 focus:ring-0 accent-black"
              />
              <span className="ml-3 text-sm text-gray-700">{method}</span>
            </label>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">No payment methods available</div>
        )}
      </FilterDropdown>
      </div>
    </div>
  );
}