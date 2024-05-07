import React from "react";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};

export default Layout;