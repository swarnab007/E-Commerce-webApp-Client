import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout.jsx";
import { useAuth } from "../../context/Auth.jsx";
import axios from "axios";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  console.log(auth.user);
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth.user) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPhoneNo(auth.user.phoneNo);
      setAddress(auth.user.address);
    }
  }, [auth.user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/users/update",
        {
          name,
          email,
          password,
          phoneNo,
          address,
        },
      );
      setAuth({ ...auth, user: data.updatedUser });
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data.updatedUser;
      localStorage.setItem("auth", JSON.stringify(ls));
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout title="My Profile">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-md 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            My Profile
          </h2>
          <form onSubmit={handleUpdate} className="mt-8">
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
                  className="w-full mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
