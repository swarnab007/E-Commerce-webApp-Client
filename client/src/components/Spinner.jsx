import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(4);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000)
    if (count === 0) {
      navigate("/login", {
        state: location.pathname
      });
    }
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">Redirecting you in {count} seconds</h1>
      <ColorRing
        visible={true}
        height="120"
        width="120"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#64e15b", "#7b60f4", "#6af873", "#abbd81", "#0d5216"]}
      />
    </div>
  );
};

export default Spinner;
