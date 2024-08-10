import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Ethics_Logo.png";
import ProfileTrip from "./ProfileCompo/ProfileTrip";

function User() {
  return (
    <>
      <div className="user border border-gray-500 h-screen m-8">
        <div className="upper h-2/5 w-full  flex">
          <div className="profile-picture">
            <img src={Logo} alt="" className="" width={300} height={100} />
          </div>
          <div className="info h-full content-center ">
            <p>@hbsolanki </p>
            <p>Hardik Solanki</p>
            <p>भारतीय | हिंदू धर्मो रक्षति रक्षितः॥ #akhandbharat 🧿</p>
            <a className="text-blue-600" href="https://github.com/hbsolanki">
              https://github.com/hbsolanki
            </a>
          </div>
          <div className="buttons content-end ">
            <Link className="" to={"/user/settings"}>
              Settings
            </Link>
            <div className="trip-search">
              <div>
                <div className="mt-2">
                  <input
                    id="SearchTrip"
                    name="SearchTrip"
                    type="text"
                    className=" m-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button className="">Search Trip</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lower h-3/5 w-full ">
          <ProfileTrip />
          <ProfileTrip />
          <ProfileTrip />
        </div>
      </div>
    </>
  );
}

export default User;
