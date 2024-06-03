import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { Prices } from "../components/Prices.jsx";
import { Link } from "react-router-dom";
import { useCart } from "../context/Cart.jsx";
import { useAuth } from "../context/Auth.jsx";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

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

  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/all-products");
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    if (!radio.length && checked.length === 0) {
      getProducts();
    }
  }, [radio.length, checked]);

  useEffect(() => {
    if (radio.length || checked.length) {
      getFilteredProducts();
    }
  }, [radio, checked]);

  const filterHandler = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const getFilteredProducts = async () => {
    try {
      const { data } = await axios.post("/api/v1/products/filter-product", {
        checked,
        radio,
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch filtered products");
    }
  };

  const addToCart = async (product) => {
    try {
      const { data } = await axios.post(
        "/api/v1/users/add-to-cart",
        {
          slug: product.slug,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `${auth.token}`,
          },
        }
      );
      setCart(data.cart);
      toast.success("Product added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <Layout title="Categories">
      <div className="flex flex-col lg:flex-row">
        <aside className="lg:w-1/4 bg-gray-100 p-4 lg:p-0 lg:pr-4">
          <details
            open
            className="max-w-full w-full overflow-hidden rounded-lg border border-gray-200 open:shadow-lg text-gray-700"
          >
            <summary className="flex cursor-pointer select-none items-center justify-between bg-gray-100 px-5 py-3 lg:hidden">
              <span className="text-sm font-medium">Apply Filters</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </summary>

            <form className="flex flex-col border-t border-gray-200 lg:border-t-0">
              <fieldset className="w-full">
                <legend className="block w-full bg-gray-50 px-5 py-3 text-md font-bold">
                  Type
                </legend>
                <div className="space-y-2 px-5 py-6">
                  {categories.map((c) => (
                    <div key={c._id} className="flex items-center">
                      <input
                        id={c._id}
                        type="checkbox"
                        name="Type"
                        checked={checked.includes(c._id)}
                        onChange={(e) => filterHandler(e.target.checked, c._id)}
                        className="h-5 w-5 rounded border-gray-300"
                      />
                      <label
                        htmlFor={c._id}
                        className="ml-3 text-md font-medium"
                      >
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset className="w-full">
                <legend className="block w-full bg-gray-50 px-5 py-3 text-md font-bold">
                  Price
                </legend>
                <div className="text-left space-y-2 px-5 py-6">
                  {Prices.map((p) => (
                    <div className="space-x-2 font-medium" key={p.id}>
                      <input
                        type="radio"
                        name="price"
                        value={p.range}
                        onChange={(e) => setRadio(e.target.value)}
                      />
                      <label>{p.name}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </form>
            <div className="flex justify-center border-t border-gray-200 px-5 py-3">
              <button
                onClick={() => {
                  setChecked([]);
                  setRadio("");
                  getProducts();
                }}
                name="commit"
                type="button"
                className="rounded bg-blue-600 px-5 py-3 text-md font-medium text-white active:scale-95"
              >
                Reset Filters
              </button>
            </div>
          </details>
        </aside>
        <main className="flex-1 p-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 w-full p-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="w-full rounded-md border shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={`/api/v1/products/product/photo/${p._id}`}
                  alt={p.name}
                  className="h-[200px] w-full rounded-t-md object-contain"
                />
                <div className="p-4">
                  <h1 className="text-lg font-semibold">{p.name}</h1>
                  <p className="mt-3 text-md text-gray-600 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-black">
                      ${p.price}
                    </span>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Link to={`/product-details/${p.slug}`}>
                      <button
                        type="button"
                        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Details
                      </button>
                    </Link>
                    <button
                      onClick={() => addToCart(p)}
                      type="submit"
                      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Categories;
