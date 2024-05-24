import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout.jsx";
import AdminMenu from "../../components/layout/AdminMenu.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";

const UpdateProduct = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  // get single product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product/${params.slug}`
      );
      console.log(data.product);
      setName(data.product.name);
      setDescription(data.product.description);
      setQuantity(data.product.quantity);
      setPrice(data.product.price);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching the product");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("shipping", shipping);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.put(
        `/api/v1/products/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(`${data.product.name} updated successfully`);
      setName("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setShipping("");
      setCategory("");
      setImage(null);
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating the product");
    }
  };

  // get all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/categories/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const deleteHandler = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      content: "This action cannot be undone",
      onOk: async () => {
        try {
          const { data } = await axios.delete(
            `/api/v1/products/delete-product/${id}`
          );
          toast.success(`${data.message}`);
          navigate("/dashboard/admin/products");
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong in deleting the product");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="flex flex-col sm:flex-row h-full overflow-hidden">
        <div className=" shadow-lg w-[280px] sm:w-64">
          <AdminMenu />
        </div>

        <section className="bg-gray-100 dark:bg-gray-900 w-full">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Update product
            </h2>
            <form onSubmit={updateHandler}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Product quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="shipping"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Shipping
                  </label>
                  <select
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select shipping option</option>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="8"
                    value={description}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex mt-6 items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    {image ? (
                      <span>{image.name}</span>
                    ) : (
                      <span>Choose files</span>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    name="image"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </label>
                {image && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Product"
                      className="mt-4 w-44 h-52 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                class="text-blue-700 hover:text-white border mt-6 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Update product
              </button>
            </form>
            <button
              onClick={deleteHandler}
              type="button"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
            >
              Delete product
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
