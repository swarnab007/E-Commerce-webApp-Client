import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Policies from "./pages/Policies.jsx";
import PagenotFound from "./pages/PagenotFound.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Products from "./pages/Admin/Products.jsx";
import EditProduct from "./pages/Admin/EditProduct.jsx";
import Categories from "./pages/Categories.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Details from "./pages/Details.jsx";
import CartPage from "./pages/CartPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-reasults" element={<SearchPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product-details/:slug" element={<Details />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<EditProduct />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="*" element={<PagenotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
