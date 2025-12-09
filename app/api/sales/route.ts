import { NextRequest, NextResponse } from 'next/server';
import  { prisma } from '@/lib/prisma';
import { SalesTransaction } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/sales
 * Fetches sales transactions from PostgreSQL database
 * Supports pagination and filtering via query params
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50'); // Default to all
    const skip = (page - 1) * limit;

    // Optional filters
    const customerRegion = searchParams.get('customerRegion');
    const productCategory = searchParams.get('productCategory');
    const orderStatus = searchParams.get('orderStatus');

    // Build where clause
    const where: {
      customerRegion?: string;
      productCategory?: string;
      orderStatus?: string;
    } = {};
    
    if (customerRegion) {
      where.customerRegion = customerRegion;
    }
    
    if (productCategory) {
      where.productCategory = productCategory;
    }
    
    if (orderStatus) {
      where.orderStatus = orderStatus;
    }

    // Fetch data from database
    const [transactions, totalCount] = await Promise.all([
      prisma.salesTransaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          transactionId: 'asc',
        },
      }),
      prisma.salesTransaction.count({ where }),
    ]);

    // Transform data to match frontend SalesTransaction type
    const formattedTransactions: SalesTransaction[] = transactions.map((t) => ({
      transactionId: t.transactionId,
      date: t.date,
      customerId: t.customerId,
      customerName: t.customerName,
      phoneNumber: t.phoneNumber,
      gender: t.gender,
      age: t.age,
      customerRegion: t.customerRegion,
      customerType: t.customerType,
      productId: t.productId,
      productName: t.productName,
      brand: t.brand,
      productCategory: t.productCategory,
      tags: t.tags,
      quantity: t.quantity,
      pricePerUnit: t.pricePerUnit,
      discountPercentage: t.discountPercentage,
      totalAmount: t.totalAmount,
      finalAmount: t.finalAmount,
      paymentMethod: t.paymentMethod,
      orderStatus: t.orderStatus,
      deliveryType: t.deliveryType,
      storeId: t.storeId,
      storeLocation: t.storeLocation,
      salespersonId: t.salespersonId,
      employeeName: t.employeeName,
    }));

    return NextResponse.json({
      success: true,
      data: formattedTransactions,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch sales data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
