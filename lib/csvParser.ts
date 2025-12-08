import { SalesTransaction } from './types';

/**
 * Parses a CSV string and converts it to an array of SalesTransaction objects
 */
export function parseCSV(csvContent: string): SalesTransaction[] {
  const lines = csvContent.trim().split('\n');
  
  if (lines.length < 2) {
    return [];
  }

  // Skip the header line
  const dataLines = lines.slice(1);
  
  const transactions: SalesTransaction[] = [];

  for (const line of dataLines) {
    try {
      const transaction = parseCSVLine(line);
      if (transaction) {
        transactions.push(transaction);
      }
    } catch (error) {
      console.error('Error parsing line:', line, error);
    }
  }

  return transactions;
}

/**
 * Parses a single CSV line into a SalesTransaction object
 * Handles quoted fields that may contain commas
 */
function parseCSVLine(line: string): SalesTransaction | null {
  const fields: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      fields.push(currentField.trim());
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Add the last field
  fields.push(currentField.trim());

  if (fields.length < 26) {
    return null;
  }

  // Parse tags - they are comma-separated within quotes
  const tagsString = fields[13] || '';
  const tags = tagsString
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  return {
    transactionId: parseInt(fields[0]) || 0,
    date: fields[1] || '',
    customerId: fields[2] || '',
    customerName: fields[3] || '',
    phoneNumber: fields[4] || '',
    gender: fields[5] || '',
    age: parseInt(fields[6]) || 0,
    customerRegion: fields[7] || '',
    customerType: fields[8] || '',
    productId: fields[9] || '',
    productName: fields[10] || '',
    brand: fields[11] || '',
    productCategory: fields[12] || '',
    tags,
    quantity: parseInt(fields[14]) || 0,
    pricePerUnit: parseFloat(fields[15]) || 0,
    discountPercentage: parseFloat(fields[16]) || 0,
    totalAmount: parseFloat(fields[17]) || 0,
    finalAmount: parseFloat(fields[18]) || 0,
    paymentMethod: fields[19] || '',
    orderStatus: fields[20] || '',
    deliveryType: fields[21] || '',
    storeId: fields[22] || '',
    storeLocation: fields[23] || '',
    salespersonId: fields[24] || '',
    employeeName: fields[25] || '',
  };
}

/**
 * Loads and parses the CSV file from the public directory
 */
export async function loadSalesData(): Promise<SalesTransaction[]> {
  try {
    
    const response = await fetch('/convertcsv.csv');
    
    if (!response.ok) {
      throw new Error('Failed to load CSV file');
    }

    const csvContent = await response.text();
    return parseCSV(csvContent);
  } catch (error) {
    console.error('Error loading sales data:', error);
    return [];
  }
}
