import React, { useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Layout title="Dashboard - Admin">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-50 dark:bg-gray-800 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 sm:relative sm:flex-shrink-0`}
        >
          <div className="flex items-center justify-between p-4 sm:hidden">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <AdminMenu />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col sm:ml-64">
          <header className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 sm:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h2>
          </header>

          <div className="bg-white overflow-hidden shadow rounded-lg border dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-2xl leading-6 font-medium text-gray-900 dark:text-white">
                Admin Profile
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-600">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-lg font-medium text-gray-500 dark:text-gray-300">
                    Full name
                  </dt>
                  <dd className="mt-1 text-lg text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {auth.user.name}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-lg font-medium text-gray-500 dark:text-gray-300">
                    Email address
                  </dt>
                  <dd className="mt-1 text-lg text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {auth.user.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-lg font-medium text-gray-500 dark:text-gray-300">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-lg text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {auth.user.phoneNo}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-lg font-medium text-gray-500 dark:text-gray-300">
                    Address
                  </dt>
                  <dd className="mt-1 text-lg text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {auth.user.address}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
