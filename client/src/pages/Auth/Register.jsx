import React, { useState } from "react";
import Layout from "../../components/layout/Layout.jsx";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, phoneNo, address);
    try {
      const { data } = await axios.post(
        "/api/v1/users/register",
        {
          name,
          email,
          password,
          phoneNo,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout title="Register - Ecommerce app">
      <section className="pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-md 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign up
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  title=""
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                  Sign In
                </Link>
              </p>
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Full Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Full Name"
                        id="name"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phoneno"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Phone No{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="number"
                        placeholder="Phone No"
                        id="phone no"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Address"
                        id="address"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className= "w-full mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="h-full w-full">
            <img
              className="mx-auto mt-8 h-full w-full rounded-md object-cover mb-8"
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
