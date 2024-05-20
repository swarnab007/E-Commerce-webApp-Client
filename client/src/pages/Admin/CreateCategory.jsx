import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/categories/create-category",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`${name} created successfully`);
      setName("");
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/categories/categories");

      setCategory(data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(category); // This will log the updated categories after the state has changed
  }, [category]);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="flex flex-col sm:flex-row h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-full sm:w-64">
          <AdminMenu />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 flex justify-center">
          <div className="relative h-fit overflow-x-auto shadow-md sm:rounded-lg w-full sm:max-w-4xl">
            <h1 className="mb-10 text-4xl font-bold">Create Category</h1>
            <div className="pb-6">
              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category name
                  </th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {category.map((c) => {
                  return (
                    <tr key={c._id}>
                      <td className="px-6 py-4">{c.name}</td>
                      <td>
                        <button>
                          <Link
                            to="#"
                            className="text-blue-500 underline hover:text-blue-800"
                          >
                            <span>Edit</span>
                          </Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
