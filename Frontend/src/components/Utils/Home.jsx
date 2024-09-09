import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Ethics_Logo.png";
import Footer from "./Footer";
// import "./Home.css";

function Home() {
  return (
    <>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src={Logo} className="w-32 h-auto" alt="Ethics Logo" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            Welcome to Ethics: Travel Hub
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover, explore, and connect with fellow travelers. Find the best
            travel experiences, share your journeys, and make new friends along
            the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              className="text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 bg-white hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition-all"
              to="/signin"
            >
              Sign In
            </Link>
            <Link
              className="text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:ring-2 focus:ring-gray-300 transition-all"
              to="/registration"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
