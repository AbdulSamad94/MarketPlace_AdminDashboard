// components/OrderHistory.tsx
import React from "react";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "Delivered" | "Pending";
}

const orders: Order[] = [
  {
    id: "001",
    customer: "Abdul Samad",
    date: "2025-02-01",
    total: 250,
    status: "Delivered",
  },
  {
    id: "002",
    customer: "Abdullah",
    date: "2025-02-03",
    total: 150,
    status: "Pending",
  },
  {
    id: "003",
    customer: "Abdul samad",
    date: "2025-02-05",
    total: 300,
    status: "Delivered",
  },
];

const OrderHistory: React.FC = () => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-4">Order History</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${order.total.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrderHistory;
