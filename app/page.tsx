'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterPanel';
import SortDropdown from '@/components/SortDropdown';
import TransactionTable from '@/components/TransactionTable';
import Pagination from '@/components/Pagination';
import SummaryCard from '@/components/SummaryCard';
import { loadSalesData } from '@/lib/apiService';
import { processTransactions, extractAvailableFilters } from '@/lib/dataService';
import { SalesTransaction, ActiveFilters, SortOption } from '@/lib/types';

export default function Home() {
  const [allData, setAllData] = useState<SalesTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    customerRegions: [],
    genders: [],
    ageRange: null,
    productCategories: [],
    tags: [],
    paymentMethods: [],
    dateRange: null,
  });
  const [sortOption, setSortOption] = useState<SortOption>('customer-name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await loadSalesData();
      setAllData(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Extract available filters
  const availableFilters = useMemo(() => {
    return extractAvailableFilters(allData);
  }, [allData]);

 

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  }, []);

  const handleFilterChange = useCallback((filters: ActiveFilters) => {
    setActiveFilters(filters);
    setCurrentPage(1); 
  }, []);

  const handleSortChange = useCallback((option: SortOption) => {
    setSortOption(option);
    setCurrentPage(1); 
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters({
      customerRegions: [],
      genders: [],
      ageRange: null,
      productCategories: [],
      tags: [],
      paymentMethods: [],
      dateRange: null,
    });
    setSearchQuery('');
    setCurrentPage(1); 
  }, []);


  // Process data
  const { filteredData, paginatedData, totalItems, totalPages } = useMemo(() => {
    return processTransactions(
      allData,
      searchQuery,
      activeFilters,
      sortOption,
      currentPage,
      pageSize
    );
  }, [allData, searchQuery, activeFilters, sortOption, currentPage]);

  // Calculate totals
  const totals = useMemo(() => {
    const totalUnits = filteredData.reduce((sum, t) => sum + t.quantity, 0);
    const totalAmount = filteredData.reduce((sum, t) => sum + t.totalAmount, 0);
    const totalDiscount = filteredData.reduce((sum, t) => sum + (t.totalAmount - t.finalAmount), 0);
    return { totalUnits, totalAmount, totalDiscount };
  }, [filteredData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans text-gray-900 flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-[15%] flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-[1rem] font-bold text-gray-900 whitespace-nowrap">Sales Management System</h1>
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Name, Phone no."
            />
          </div>
        </header>

        {/* Filters and Controls */}
        <div className="py-3 px-4 space-y-6">
          
          {/* Top Filter Bar & Sort */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <FilterBar
                availableFilters={availableFilters}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearFilters}
              />
            </div>
            <div className="shrink-0">
              <SortDropdown value={sortOption} onChange={handleSortChange} />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="flex flex-wrap gap-4">
            <SummaryCard 
              label="Total units sold" 
              value={totals.totalUnits} 
            />
            <SummaryCard 
              label="Total Amount" 
              value={`₹${totals.totalAmount.toLocaleString()}`} 
              subValue={`${filteredData.length} SRs`}
            />
            <SummaryCard 
              label="Total Discount" 
              value={`₹${totals.totalDiscount.toLocaleString()}`} 
              subValue={`${filteredData.length} SRs`}
            />
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-lg  ">
            <TransactionTable transactions={paginatedData} />
            
            {/* Pagination footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-white rounded-b-lg">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}