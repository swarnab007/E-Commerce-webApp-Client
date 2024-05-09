import React, {useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Auth.jsx";
import Spinner from "../components/Spinner.jsx";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  // console.log(auth.token);
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const { data } = await axios.get("/api/v1/users/auth-user");
        if (data.ok) setOk(true);
        else setOk(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) fetchAuth();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
