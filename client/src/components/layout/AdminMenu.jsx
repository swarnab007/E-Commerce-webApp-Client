import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
      <div className="text-xl px-3 py-4 w-[230px] overflow-y-auto">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Admin Panel
        </h4>
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/dashboard/admin/create-category"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-400 hover:text-white group"
            >
              <span className="ml-3">Create Category</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin/create-product"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-400 hover:text-white group"
            >
              <span className="ml-3">Create Product</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin/products"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-400 hover:text-white group"
            >
              <span className="ml-3">Products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin/orders"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-400 hover:text-white group"
            >
              <span className="ml-3">Orders</span>
            </Link>
          </li>
        </ul>
      </div>
  );
};

export default AdminMenu;
