import { SalesTransaction, ActiveFilters, SortOption, AvailableFilters } from './types';

/**
 * Search transactions by customer name or phone number
 */
export function searchTransactions(
  transactions: SalesTransaction[],
  query: string
): SalesTransaction[] {
  if (!query || query.trim() === '') {
    return transactions;
  }

  const searchTerm = query.toLowerCase().trim();

  return transactions.filter(transaction => {
    const customerName = transaction.customerName.toLowerCase();
    const phoneNumber = transaction.phoneNumber.toLowerCase();

    return customerName.includes(searchTerm) || phoneNumber.includes(searchTerm);
  });
}

/**
 * Filter transactions based on active filters
 */
export function filterTransactions(
  transactions: SalesTransaction[],
  filters: ActiveFilters
): SalesTransaction[] {
  let filtered = [...transactions];

  // Filter by customer regions
  if (filters.customerRegions.length > 0) {
    filtered = filtered.filter(t =>
      filters.customerRegions.includes(t.customerRegion)
    );
  }

  // Filter by genders
  if (filters.genders.length > 0) {
    filtered = filtered.filter(t => filters.genders.includes(t.gender));
  }

  // Filter by age range
  if (filters.ageRange) {
    const { min, max } = filters.ageRange;
    filtered = filtered.filter(t => t.age >= min && t.age <= max);
  }

  // Filter by product categories
  if (filters.productCategories.length > 0) {
    filtered = filtered.filter(t =>
      filters.productCategories.includes(t.productCategory)
    );
  }

  // Filter by tags (transaction must have at least one matching tag)
  if (filters.tags.length > 0) {
    filtered = filtered.filter(t =>
      t.tags.some(tag => filters.tags.includes(tag))
    );
  }

  // Filter by payment methods
  if (filters.paymentMethods.length > 0) {
    filtered = filtered.filter(t =>
      filters.paymentMethods.includes(t.paymentMethod)
    );
  }

  // Filter by date range
  if (filters.dateRange) {
    const { start, end } = filters.dateRange;
    filtered = filtered.filter(t => {
      const transactionDate = new Date(t.date);
      const startDate = new Date(start);
      const endDate = new Date(end);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  return filtered;
}

/**
 * Sort transactions based on sort option
 */
export function sortTransactions(
  transactions: SalesTransaction[],
  sortOption: SortOption
): SalesTransaction[] {
  const sorted = [...transactions];

  switch (sortOption) {
    case 'date-desc':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA; // Newest first
      });

    case 'quantity':
      return sorted.sort((a, b) => b.quantity - a.quantity);

    case 'customer-name-asc':
      return sorted.sort((a, b) =>
        a.customerName.localeCompare(b.customerName)
      );

    default:
      return sorted;
  }
}

/**
 * Paginate transactions
 */
export function paginateTransactions(
  transactions: SalesTransaction[],
  page: number,
  pageSize: number
): SalesTransaction[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return transactions.slice(startIndex, endIndex);
}

/**
 * Calculate total pages
 */
export function calculateTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

/**
 * Extract available filter options from data
 */
export function extractAvailableFilters(
  transactions: SalesTransaction[]
): AvailableFilters {
  const regions = new Set<string>();
  const genders = new Set<string>();
  const categories = new Set<string>();
  const tags = new Set<string>();
  const paymentMethods = new Set<string>();
  let minAge = Infinity;
  let maxAge = -Infinity;

  transactions.forEach(transaction => {
    regions.add(transaction.customerRegion);
    genders.add(transaction.gender);
    categories.add(transaction.productCategory);
    paymentMethods.add(transaction.paymentMethod);

    transaction.tags.forEach(tag => tags.add(tag));

    if (transaction.age < minAge) minAge = transaction.age;
    if (transaction.age > maxAge) maxAge = transaction.age;
  });

  // Handle edge case when no data is available
  const hasData = transactions.length > 0;
  const finalMinAge = hasData && isFinite(minAge) ? minAge : 0;
  const finalMaxAge = hasData && isFinite(maxAge) ? maxAge : 100;

  return {
    regions: Array.from(regions).sort(),
    genders: Array.from(genders).sort(),
    categories: Array.from(categories).sort(),
    tags: Array.from(tags).sort(),
    paymentMethods: Array.from(paymentMethods).sort(),
    ageRange: { min: finalMinAge, max: finalMaxAge },
  };
}

/**
 * Apply all transformations: search, filter, sort, and paginate
 */
export function processTransactions(
  allTransactions: SalesTransaction[],
  searchQuery: string,
  filters: ActiveFilters,
  sortOption: SortOption,
  currentPage: number,
  pageSize: number
) {
  // Step 1: Search
  let processed = searchTransactions(allTransactions, searchQuery);

  // Step 2: Filter
  processed = filterTransactions(processed, filters);

  // Step 3: Sort
  processed = sortTransactions(processed, sortOption);

  // Step 4: Calculate pagination
  const totalItems = processed.length;
  const totalPages = calculateTotalPages(totalItems, pageSize);

  // Step 5: Paginate
  const paginatedData = paginateTransactions(processed, currentPage, pageSize);

  return {
    filteredData: processed,
    paginatedData,
    totalItems,
    totalPages,
  };
}
