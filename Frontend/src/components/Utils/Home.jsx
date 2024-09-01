import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Ethics_Logo.png";
import "./Home.css";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <div className="Main-Home">
        <div>
          <div className="flex justify-center mb-2">
            <img src={Logo} className="home-logo " alt="" />
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
            Ethics : Travel Hub
          </h1>
          <div className="links m-10">
            <Link
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] m-5"
              to="/signin"
            >
              Sign in
            </Link>
            <Link
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              to={"/registration"}
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
