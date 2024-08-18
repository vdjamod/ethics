import React from "react";
import Logo from "../../assets/Ethics_Logo.png";
import { Link } from "react-router-dom";

function UserProfile({ userData }) {
  return (
    <>
      <div className="upper h-2/5 xw-full  flex ">
        <div className="profile-picture">
          <img
            src={Logo}
            alt=""
            className="rounded-full"
            width={300}
            height={100}
          />
        </div>
        <div className="info h-full content-center ">
          <p>@{userData.username} </p>
          {/* <p>{userData.name}</p> */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
            libero dolor quas sint, esse, minus iste corporis nihil vitae iusto
            maxime blanditiis magnam similique voluptatum veritatis consequuntur
            ullam eum laborum. 🧿
          </p>
          <a className="text-blue-600" href="https://github.com/hbsolanki">
            https://github.com/hbsolanki
          </a>
        </div>
        <div className="buttons justify-center content-end ">
          <Link
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            to={`/${userData.username}/profilesetting`}
          >
            Settings
          </Link>
          <div className="trip-search">
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
