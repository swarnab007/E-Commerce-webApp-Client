import React from "react";
import { Trash, Heart } from "lucide-react";
import { useCart } from "../context/Cart.jsx";
import Layout from "../components/layout/Layout.jsx";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/Auth.jsx";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  console.log(cart);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Product removed from cart");
  };

  const getTotalAmount = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
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
              {cart.map((product) => (
                <li
                  key={product._id}
                  className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg shadow-md p-4 border border-gray-200"
                >
                  <div className="flex w-full sm:w-1/3">
                    <img
                      src={`/api/v1/products/product/photo/${product._id}`}
                      alt={product.name}
                      className="h-44 w-44 object-contain mx-auto"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-2/3 space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Name: {product.name}
                      </h3>
                      <p className="text-lg font-semibold">${product.price}</p>
                    </div>
                    <p className="text-md text-left text-gray-600">
                      Description: {product.description}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => removeFromCart(product._id)}
                        type="submit"
                        className="flex items-center mt-6 text-red-600 hover:text-red-800"
                      >
                        <Trash size={16} />
                        <span className="ml-1 font-medium text-lg">Remove</span>
                      </button>
                      <button
                        type="button"
                        className="flex mt-6 items-center text-blue-600 hover:text-blue-800"
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
                <div className="flex justify-end space-x-6 mt-6">
                  <button
                    type="submit"
                    onClick={() => navigate("/")}
                    className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Continue Shopping
                  </button>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-md px-5 py-2.5 text-center"
                  >
                    Proceed
                  </button>
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
