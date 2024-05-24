import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout.jsx";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm.jsx";
import { Modal } from "antd";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);

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
      toast.error("Something went wrong in creating the category");
    }
  };

  // Update category
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/v1/categories/update-category/${selected}`,
        { name: updatedName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`${updatedName} updated successfully`);
      setUpdatedName("");
      setIsModalVisible(false);
      getCategories();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating the category");
    }
  };

  // Delete category
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/v1/categories/delete-category/${id}`);
      toast.success(`Category deleted successfully`);
      getCategories();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in deleting the category");
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
      <div className="flex flex-col sm:flex-row h-full overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-full sm:w-64">
          <AdminMenu />
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 flex justify-center">
          <div className="relative h-fit overflow-x-auto shadow-md sm:rounded-lg w-full sm:max-w-4xl">
            <h1 className="mb-10 text-4xl font-bold text-center sm:text-left">
              Create Category
            </h1>
            <div className="pb-6">
              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Category name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {category.map((c) => (
                    <tr key={c._id} className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4">{c.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-4 sm:justify-between">
                          <button
                            type="button"
                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick={() => {
                              setIsModalVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c._id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md sm:px-5 sm:py-2.5 px-3 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => deleteHandler(c._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Modal
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
              >
                <CategoryForm
                  handleSubmit={updateHandler}
                  name={updatedName}
                  setName={setUpdatedName}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
