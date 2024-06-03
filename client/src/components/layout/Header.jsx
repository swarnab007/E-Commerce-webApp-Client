import React, { useEffect } from "react";
import "../../App.css";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth.jsx";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput.jsx";
import { useCart } from "../../context/Cart.jsx";
import axios from "axios";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const { data } = await axios.get("/api/v1/users/cart", {
          headers: {
            Authorization: `${auth.token}`,
          },
        });
        setCart(data.cart);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch cart details");
      }
    };
    if (auth.user) {
      fetchCartDetails();
    }
  }, [auth]);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logged out successfully");
    localStorage.removeItem("auth");
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">
          ECommerce
        </Link>
        <div className="hidden lg:flex flex-1 items-center space-x-6 justify-center">
          <SearchInput />
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="text-xl font-semibold hover:text-gray-400"
              activeClassName="text-orange-500"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {auth.user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
              >
                <span>{auth.user.name.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 font-medium bg-white text-black rounded-md shadow-lg z-10">
                  <NavLink
                    to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                    className="block text-center text-black px-4 py-2 hover:bg-blue-400"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block text-center w-full px-4 py-2 hover:bg-blue-400"
                  >
                    Log out
                  </button>
                  <NavLink
                    to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}/orders`}
                    className="block text-center text-black px-4 py-2 hover:bg-blue-400"
                  >
                    {auth.user.role === 1 ? "Manage Orders" : "My Orders"}
                  </NavLink>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/register"
                className="bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-400"
              >
                Sign up
              </NavLink>
              <NavLink
                to="/login"
                className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Log in
              </NavLink>
            </>
          )}
          <Link to="/cart">
            <button className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600">
              Cart<span className="ml-2">[{cart.length}]</span>
            </button>
          </Link>
        </div>
        <button onClick={toggleMenu} className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-black">
          <div className="flex flex-col items-center p-4 space-y-4">
            <button onClick={toggleMenu} className="self-end">
              <X className="w-6 h-6 text-white" />
            </button>
            <form className="flex items-center w-full px-4">
              <label htmlFor="simple-search-mobile" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <button>
                    <svg
                      className="w-4 h-6 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                      />
                    </svg>
                  </button>
                </div>
                <input
                  type="text"
                  id="simple-search-mobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search branch name..."
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="text-xl font-semibold hover:text-gray-400"
                activeClassName="text-orange-500"
                onClick={toggleMenu}
              >
                {item.name}
              </NavLink>
            ))}
            {auth.user ? (
              <>
                <NavLink
                  to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                  className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 w-full text-center"
                  onClick={toggleMenu}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 w-full text-center"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-400 w-full text-center"
                  onClick={toggleMenu}
                >
                  Sign up
                </NavLink>
                <NavLink
                  to="/login"
                  className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 w-full text-center"
                  onClick={toggleMenu}
                >
                  Log in
                </NavLink>
              </>
            )}
            <Link to="/cart">
              <button className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600">
                Cart<span className="ml-2">[{cart.length}]</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
