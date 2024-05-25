import React from "react";
import "../../App.css";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth.jsx";
import toast from "react-hot-toast";

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        <nav className="hidden lg:flex space-x-6 flex-1 justify-center">
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
        </nav>
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
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                  <NavLink
                    to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                    className="block px-4 py-2 hover:bg-blue-400"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 hover:bg-blue-400"
                  >
                    Log out
                  </button>
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
          <button className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600">
            Cart<span className="ml-2">[0]</span>
          </button>
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
            <button className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 w-full text-center">
              Cart<span className="ml-2">[0]</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
