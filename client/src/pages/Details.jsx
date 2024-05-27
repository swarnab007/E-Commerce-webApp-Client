import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const Details = () => {
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const params = useParams();

  // get single product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product/${params.slug}`
      );
      setProduct(data.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.slug) getProduct();
  }, [params.slug]);

  // get similar product
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/similar-products/${pid}/${cid}`
      );
      setSimilarProducts(data.products);
      console.log(similarProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Product Details">
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-5xl font-bold text-center mt-8 mb-6">
          Product Details
        </h1>
        <section className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-5 py-24">
            <div className="flex flex-col lg:flex-row items-start bg-white rounded-lg shadow-lg">
              <div className="w-full lg:w-1/2 overflow-hidden">
                <img
                  src={`/api/v1/products/product/photo/${product._id}`}
                  alt={product.name}
                  className="h-[400px] w-full object-contain transform transition-transform duration-500 ease-in-out hover:scale-110 rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                />
              </div>
              <div className="p-8 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                <h1 className="mb-4 text-3xl font-semibold text-gray-900">
                  {product.name}
                </h1>
                <div className="mb-4 flex items-center">
                  <span className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-500" />
                    ))}
                    <span className="ml-3 text-sm font-semibold text-gray-700">
                      4 Reviews
                    </span>
                  </span>
                </div>
                <p className="mb-6 text-gray-700">{product.description}</p>
                <div className="flex flex-col space-y-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price && `$${product.price}`}
                  </span>
                  <button
                    type="button"
                    className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-16">
              <h1 className="text-4xl font-bold text-center mb-6">
                Similar Products
              </h1>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 p-4">
                {similarProducts?.map((p) => (
                  <div
                    key={p._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={`/api/v1/products/product/photo/${p._id}`}
                      alt={p.name}
                      className="h-[200px] w-full object-contain rounded-t-lg"
                    />
                    <div className="p-4">
                      <h1 className="text-lg font-semibold">{p.name}</h1>
                      <p className="mt-2 text-gray-600">{p.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-black">
                          ${p.price}
                        </span>
                        <div className="flex justify-center items-center">
                          {[...Array(4)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-yellow-300 ms-1"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          ))}
                          <svg
                            className="w-4 h-4 text-gray-300 ms-1"
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
                            className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          >
                            Details
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Details;
