import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout.jsx";
import { useAuth } from "../../context/Auth.jsx";
import axios from "axios";
import { SERVER_URL } from "../../const.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/api/v1/users/orders`);
      console.log("Orders fetched:", data.orders); // Log fetched data
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth) {
      getOrders();
    }
  }, [auth]);

  return (
    <Layout title="My Orders">
      <div className="container mx-auto px-4 py-8">
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
                    <td className="px-6 py-4">{o.status}</td>
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
                    src={`${SERVER_URL}/api/v1/products/product/photo/${p._id}`}
                    alt={p.name}
                    className="h-[200px] w-[200px] rounded-t-md object-contain"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">Name: {p.name}</h2>
                    <p className="text-gray-600">Description: {p.description}</p>
                    <p className="text-gray-800 font-semibold">Price: ${p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Orders;
