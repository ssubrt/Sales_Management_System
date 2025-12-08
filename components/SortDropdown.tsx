'use client';

import { useState, useRef, useEffect } from 'react';
import { SortOption } from '@/lib/types';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'customer-name-asc', label: 'Customer Name (A-Z)' },
  { value: 'date-desc', label: 'Date (Newest First)' },
  { value: 'quantity', label: 'Quantity' },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current selected option label
  const selectedLabel = sortOptions.find(opt => opt.value === value)?.label || 'Date (Newest First)';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: SortOption) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 px-3 py-3 rounded-lg border text-sm transition-colors whitespace-nowrap ${
          isOpen 
            ? 'bg-gray-100 border-gray-300 text-gray-900 font-medium' 
            : 'bg-[#F3F3F3] border-transparent hover:bg-gray-100 text-gray-600'
        }`}
      >
        <span className="text-gray-500">Sort by:</span>
        <span className="font-medium text-gray-900">{selectedLabel}</span>
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
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2 max-h-96 overflow-y-auto overflow-x-hidden">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm transition-colors ${
                value === option.value ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}