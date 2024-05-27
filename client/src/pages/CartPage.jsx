import React from "react";
import { Trash, Heart } from "lucide-react";
import { useCart } from "../context/Cart.jsx";
import Layout from "../components/layout/Layout.jsx";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();

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
      <div className="container mx-auto p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>
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
        <div className="mt-8 text-right border-t border-gray-200 pt-4">
          <p className="text-lg font-semibold">
            Total amount: <span className="text-xl">₹{getTotalAmount()}</span>
          </p>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="submit"
            class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Continue Shopping
          </button>
          <button
            type="submit"
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
          >
            Proceed
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
