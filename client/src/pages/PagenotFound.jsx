import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";

function PagenotFound() {
  return (
    <Layout title="404 error" description="Page not found">
      <div className="mx-auto w-full px-2 md:px-4">
        <div className="my-12 flex items-center justify-center px-2 md:my-24 md:px-0">
          <div className="lg:flex lg:items-center lg:space-x-10">
            <img
              src="https://illustrations.popsy.co/white/resistance-band.svg"
              alt="question-mark"
              className="h-[600px] w-auto"
            />
            <div>
              <p className="mt-6 text-4xl font-bold text-black">404 error</p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                We can&apos;t find that page
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                Sorry, the page you are looking for doesn&apos;t exist or has
                been moved.
              </p>
              <div className="mt-6 flex text-center justify-center items-center space-x-8">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-black px-3 py-2 text-lg font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <Link to={"/"}>
                    <span>Go Back</span>
                  </Link>
                </button>
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <Link to={"/contact"}>Contact Us</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </Layout>
  );
}

export default PagenotFound;
