import React, { useEffect, useState } from "react";
import { Trash, Heart } from "lucide-react";
import { useAuth } from "../context/Auth.jsx";
import Layout from "../components/layout/Layout.jsx";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { SERVER_URL } from "../const.js";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/v1/users/cart`, {
          headers: {
            Authorization: `${auth.token}`,
          },
        });
        setCart(data.cart);
        console.log(cart);
      } catch (error) {
        console.error("Error fetching cart details:", error);
        toast.error("Failed to fetch cart details");
      }
    };
    if (auth.user) {
      fetchCartDetails();
    }
  }, [auth]);

  const removeFromCart = async (productId) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/v1/users/remove-from-cart`,
        { productId },
        {
          headers: {
            Authorization: `${auth.token}`,
          },
        }
      );
      console.log("Cart after removal:", data);
      setCart(data.cart);
      toast.success("Product removed from cart");
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Failed to remove product from cart");
    }
  };

  const getTotalAmount = () => {
    return cart
      .reduce((total, item) => total + item.productId.price * item.quantity, 0)
      .toFixed(2);
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/api/v1/products/braintree-token`);
      console.log("Braintree token:", data);
      setClientToken(data.clientToken);
    } catch (error) {
      console.error("Error fetching payment token:", error);
      toast.error("Failed to fetch payment token");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  const paymentHandler = async () => {
    if (!instance) {
      toast.error("Payment instance is not ready. Please try again.");
      return;
    }

    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${SERVER_URL}/api/v1/products/braintree/payment`, {
        nonce,
        cart,
      });
      console.log("Payment response:", data);
      toast.success("Payment successful");

     // Clear cart on the server
      await axios.post(`${SERVER_URL}/api/v1/users/delete-cart-items`, {
        headers: {
          Authorization: `${auth.token}`,
        },
      });

      // Clear cart locally
      setCart([]);
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.error("Payment error:", error);
      console.log("Payment error response:", error.response ? error.response.data : error.message);
      toast.error("Payment failed");
    }
  };

  return (
    <Layout title={"Cart"}>
      {auth.user ? (
        <>
          <div className="container mx-auto p-6 sm:p-10">
            <h2 className="text-3xl font-bold text-center mb-6">
              Your Cart : {cart.length} items
            </h2>
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item.productId._id}
                  className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg shadow-md p-4 border border-gray-200"
                >
                  <div className="flex w-full sm:w-1/3">
                    <img
                      src={`${SERVER_URL}/api/v1/products/product/photo/${item.productId._id}`}
                      alt={item.productId.name}
                      className="h-44 w-44 object-contain mx-auto"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-2/3 space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Name: {item.productId.name}
                      </h3>
                      <p className="text-lg font-semibold">
                        ${item.productId.price}
                      </p>
                    </div>
                    <p className="text-md text-left text-gray-600">
                      Description: {item.productId.description}
                    </p>
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => removeFromCart(item.productId._id)}
                          className="flex items-center text-red-600 hover:text-red-800"
                        >
                          <Trash size={16} />
                          <span className="ml-1 font-medium text-lg">
                            Remove
                          </span>
                        </button>
                        <span className="font-medium">
                          Quantity: {item.quantity}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Heart size={16} />
                        <span className="ml-1">Add to favorites</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8">
              <div className="text-left sm:w-1/2">
                <h2 className="text-2xl font-bold mb-2">Your Address</h2>
                <p className="text-lg">{auth.user.address}</p>
                <button
                  onClick={() => navigate("/dashboard/user")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Change Address
                </button>
              </div>
              <div className="flex flex-col items-end sm:w-1/2 mt-8 sm:mt-0">
                <p className="text-lg font-semibold text-right">
                  Total amount :{" "}
                  <span className="font-bold text-xl">₹{getTotalAmount()}</span>
                </p>
                <div className="flex justify-end mt-6">
                  <div className="mt-2 space-x-6 space-y-6">
                    {!auth?.token || !cart.length ? (
                      ""
                    ) : (
                      <>
                        {clientToken && (
                          <DropIn
                            options={{
                              authorization: clientToken,
                              paypal: { flow: "vault" },
                            }}
                            onInstance={(instance) => setInstance(instance)}
                          />
                        )}
                        <button
                          type="submit"
                          onClick={paymentHandler}
                          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-md px-5 py-2.5 text-center"
                        >
                          Make Payment
                        </button>
                      </>
                    )}
                    <button
                      type="submit"
                      onClick={() => navigate("/")}
                      className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-4xl font-bold mt-10 text-center">
          Please{" "}
          <Link className="text-blue-300 underline" to="/login">
            Login
          </Link>{" "}
          to view your cart
        </h1>
      )}
    </Layout>
  );
};

export default CartPage;
