import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout.jsx";
import axios from "axios";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Order Placed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/all-orders");
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleStatus = async (orderId, value) => {
    console.log(value);
    try {
      const { data } = await axios.put(
        `/api/v1/users/order-status/${orderId}`,
        {
          status: value,
        }
      );
      setChangedStatus(data.status);
      getOrders(); // Refresh orders after status update
    } catch (error) {
      console.error("Error changing order status:", error);
    }
  };

  return (
    <Layout title={"Admin Orders"}>
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-3xl font-semibold mb-6">All Orders</h1>
          {orders.map((o, i) => (
            <div key={o._id} className="mb-6 bg-white p-6 rounded-lg shadow-md">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Buyer</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Quantity</th>
                      <th className="px-6 py-3">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b">
                      <th className="px-6 py-4 font-medium text-gray-900">
                        {i + 1}
                      </th>
                      <td className="px-6 py-4">
                        <form className="max-w-xs mx-auto">
                          <label htmlFor="statusSelect" className="sr-only">
                            Order Status
                          </label>
                          <select
                            value={o.status}
                            onChange={(e) => handleStatus(o._id, e.target.value)}
                            id="statusSelect"
                            className="block py-2.5 px-4 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                          >
                            {status.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </form>
                      </td>
                      <td className="px-6 py-4">{o.purchaser.name}</td>
                      <td className="px-6 py-4">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">{o.products.length}</td>
                      <td className="px-6 py-4">
                        {o.payment.success === true ? "Success" : "Failed"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {o.products.map((p) => (
                  <div
                    key={p._id}
                    className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-md shadow-sm bg-gray-50"
                  >
                    <img
                      src={`/api/v1/products/product/photo/${p._id}`}
                      alt={p.name}
                      className="h-[200px] w-[200px] rounded-t-md object-contain"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Name: {p.name}
                      </h2>
                      <p className="text-gray-600">
                        Description: {p.description}
                      </p>
                      <p className="text-gray-800 font-semibold">
                        Price: ${p.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
