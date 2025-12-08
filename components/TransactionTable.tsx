import { memo } from "react";
import { SalesTransaction } from "@/lib/types";

interface TransactionTableProps {
  transactions: SalesTransaction[];
}

function TransactionTable({ transactions }: TransactionTableProps) {
  const formatCurrency = (amount: number) => {
    return `₹ ${amount.toLocaleString("en-IN")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const formatQuantity = (qty: number) => {
    return qty < 10 ? `0${qty}` : qty;
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-[#F3F3F3] ">
            <tr>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Date
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Customer ID
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Customer Name
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Phone Number
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Gender
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Age
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Customer Region
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Customer Type
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Product ID
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Brand
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Product Category
              </th>
              {/* <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Tags
              </th> */}
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Quantity
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Price per Unit
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Discount %
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Total Amount
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Final Amount
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Payment Method
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Order Status
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Delivery Type
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Store ID
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Store Location
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Salesperson ID
              </th>
              <th className="px-6 py-4 text-left text-[13px] text-[#515162]">
                Employee Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={26}
                  className="px-6 py-12 text-center text-gray-500 text-sm"
                >
                  No transactions found matching your filters.
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr
                  key={`${transaction.transactionId}-${index}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.transactionId}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 text-sm text-gray-900">
                    {transaction.customerId}
                  </td>
                  <td className="px-6 text-sm text-gray-900 font-medium">
                    {transaction.customerName}
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#515162] flex items-center gap-2">
                    {transaction.phoneNumber}
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(transaction.phoneNumber)
                      }
                      className="text-[14px] text-[#515162] hover:text-gray-600 p-1"
                      title="Copy"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.gender}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.age}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.customerRegion}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.customerType}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.productId}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162] font-medium">
                    {transaction.productName}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.brand}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.productCategory}
                  </td>
                  {/* <td className="px-6 text-[14px] text-[#515162]">
                    <div className="flex flex-wrap gap-1">
                      {transaction.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-0.5 text-xs bg-gray-100 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td> */}
                  <td className="px-6 text-[14px] text-[#515162] font-medium">
                    {formatQuantity(transaction.quantity)}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {formatCurrency(transaction.pricePerUnit)}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.discountPercentage}%
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {formatCurrency(transaction.totalAmount)}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162] font-medium">
                    {formatCurrency(transaction.finalAmount)}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 text-sm">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${
                        transaction.orderStatus === "Completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.orderStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {transaction.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.deliveryType}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.storeId}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.storeLocation}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162]">
                    {transaction.salespersonId}
                  </td>
                  <td className="px-6 text-[14px] text-[#515162] font-medium">
                    {transaction.employeeName}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(TransactionTable);
