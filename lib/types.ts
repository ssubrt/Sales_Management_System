// Core Data Types
export interface SalesTransaction {
  transactionId: number;
  date: string;
  customerId: string;
  customerName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  customerRegion: string;
  customerType: string;
  productId: string;
  productName: string;
  brand: string;
  productCategory: string;
  tags: string[];
  quantity: number;
  pricePerUnit: number;
  discountPercentage: number;
  totalAmount: number;
  finalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  deliveryType: string;
  storeId: string;
  storeLocation: string;
  salespersonId: string;
  employeeName: string;
}

// Filter Types
export interface FilterOptions {
  customerRegions: string[];
  genders: string[];
  ageRange: { min: number; max: number } | null;
  productCategories: string[];
  tags: string[];
  paymentMethods: string[];
  dateRange: { start: string; end: string } | null;
}

export interface ActiveFilters {
  customerRegions: string[];
  genders: string[];
  ageRange: { min: number; max: number } | null;
  productCategories: string[];
  tags: string[];
  paymentMethods: string[];
  dateRange: { start: string; end: string } | null;
}

// Sort Types
export type SortOption = 'date-desc' | 'quantity' | 'customer-name-asc';

export interface SortConfig {
  option: SortOption;
  label: string;
}

// Pagination Types
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Search & Filter State
export interface DataState {
  allData: SalesTransaction[];
  filteredData: SalesTransaction[];
  paginatedData: SalesTransaction[];
  searchQuery: string;
  activeFilters: ActiveFilters;
  sortOption: SortOption;
  pagination: PaginationState;
}

// Available filter options extracted from data
export interface AvailableFilters {
  regions: string[];
  genders: string[];
  categories: string[];
  tags: string[];
  paymentMethods: string[];
  ageRange: { min: number; max: number };
}
