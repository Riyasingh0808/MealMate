import React, { useState } from "react";
import { formatDate } from "../../utils"; // you can create a simple formatter if needed

const dummyOrders = [
  {
    _id: "order1",
    customerDetails: { name: "Aman Gupta" },
    orderStatus: "In Progress",
    orderDate: new Date(),
    items: [{}, {}, {}],
    table: { tableNo: 5 },
    bills: { totalWithTax: 760 },
    paymentMethod: "Cash",
  },
  {
    _id: "order2",
    customerDetails: { name: "Priya Singh" },
    orderStatus: "Ready",
    orderDate: new Date(),
    items: [{}],
    table: { tableNo: 3 },
    bills: { totalWithTax: 320 },
    paymentMethod: "UPI",
  },
];

const RecentOrdersMock = () => {
  const [orders, setOrders] = useState(dummyOrders);

  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map((order) =>
      order._id === orderId ? { ...order, orderStatus: newStatus } : order
    );
    setOrders(updated);
  };

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
        Recent Payments
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              {/* <th className="p-3">Status</th> */}
              <th className="p-3">Date & Time</th>
              <th className="p-3">Items</th>
              <th className="p-3">Table No</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-600 hover:bg-[#333]"
              >
                <td className="p-4">
                  #{Math.floor(new Date(order.orderDate).getTime())}
                </td>
                <td className="p-4">{order.customerDetails.name}</td>
                {/* <td className="p-4">
                  <select
                    className={`bg-[#1a1a1a] text-[#f5f5f5] border border-gray-500 p-2 rounded-lg focus:outline-none ${
                      order.orderStatus === "Ready"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option className="text-yellow-500" value="In Progress">
                      In Progress
                    </option>
                    <option className="text-green-500" value="Ready">
                      Ready
                    </option>
                  </select>
                </td> */}
                <td className="p-4">{formatDate(order.orderDate)}</td>
                <td className="p-4">{order.items.length} Items</td>
                <td className="p-4">Table - {order.table.tableNo}</td>
                <td className="p-4">₹{order.bills.totalWithTax}</td>
                <td className="p-4">{order.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersMock;
