import { SalesTransaction } from './types';

/**
 * Loads sales data from the API endpoint
 */
export async function loadSalesData(): Promise<SalesTransaction[]> {
  try {
    const response = await fetch('/api/sales', {
      method: 'GET',
      cache: 'no-store', // Disable caching for fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to load sales data: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to load sales data');
    }

    console.log('✅ Loaded', result.data.length, 'transactions from API');
    
    return result.data;
  } catch (error) {
    console.error('❌ Error loading sales data:', error);
    return [];
  }
}
