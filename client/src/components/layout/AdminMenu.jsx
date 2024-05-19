import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const toggleSidebar = () => {
    document
      .getElementById("default-sidebar")
      .classList.toggle("-translate-x-full");
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 bg-gray-50 dark:bg-gray-800"
        aria-label="Sidebar"
      >
        <div className="h-full text-xl px-3 py-4 overflow-y-auto">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Panel
          </h4>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/dashboard/admin/create-category"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-400 hover:text-white group"
                onClick={toggleSidebar}
              >
                <span className="ml-3">Create Category</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/create-product"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-blue-400 hover:text-white group"
                onClick={toggleSidebar}
              >
                <span className="ml-3">Create Product</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/products"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-blue-400 hover:text-white group"
                onClick={toggleSidebar}
              >
                <span className="ml-3">Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/orders"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-blue-400 hover:text-white group"
                onClick={toggleSidebar}
              >
                <span className="ml-3">Orders</span>
              </NavLink>
            </li>
            {/* Uncomment if needed
            <li>
              <NavLink
                to="/dashboard/admin/users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleSidebar}
              >
                <span className="ml-3">Users</span>
              </NavLink>
            </li>
            */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminMenu;
