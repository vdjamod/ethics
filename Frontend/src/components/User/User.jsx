import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Logo from "../../assets/Ethics_Logo.png";
import ProfileTrip from "./ProfileCompo/ProfileTrip";

function User() {
  const { username } = useParams();
  const [userData, setUserData] = useState();
  useEffect(() => {
    async function getData() {
      const user_data = (await axios.get(`/API/${username}`)).data;
      // console.log(user_data);

      setUserData(user_data);
      // console.log(typeof userData);
    }
    getData();
    console.log(userData);
  }, []);
  return (
    <>
      <div className="user border border-gray-500 h-screen m-8">
        <div className="upper h-2/5 w-full  flex ">
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
            <p>@{username} </p>
            <p>{userData.name}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
              libero dolor quas sint, esse, minus iste corporis nihil vitae
              iusto maxime blanditiis magnam similique voluptatum veritatis
              consequuntur ullam eum laborum. 🧿
            </p>
            <a className="text-blue-600" href="https://github.com/hbsolanki">
              https://github.com/hbsolanki
            </a>
          </div>
          <div className="buttons justify-center content-end ">
            <Link
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              to={`/${username}/profilesetting`}
            >
              Settings
            </Link>
            <div className="trip-search">
              <div></div>
            </div>
          </div>
        </div>
        <div className="Search-Trip ">
          <div className="mt-2 text-center ">
            <input
              id="SearchTrip"
              name="SearchTrip"
              type="text"
              className=" m-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Search Trip
            </button>
          </div>
        </div>
        <div className="lower h-3/5 w-full ">
          {/* {console.log(typeof userData["trips"][0])} */}
          {/* <ProfileTrip trip={userData["trips"]} /> */}
        </div>
      </div>
    </>
  );
}

export default User;
