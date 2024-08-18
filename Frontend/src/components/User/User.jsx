import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Logo from "../../assets/Ethics_Logo.png";
import ProfileTrip from "./ProfileCompo/ProfileTrip";
import UserProfile from "./UserProfile";

function User() {
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  let TripArray;
  let user_data;
  useEffect(() => {
    async function getData() {
      user_data = (await axios.get(`/API/${username}`)).data;
      // console.log(user_data);
      // console.log(user_data["trips"][0]);
      setUserData(user_data);
      // TripArray = userData["trips"];
      // console.log(userData["trips"]);
      // console.log(typeof userData);
    }
    getData();
  }, []);
  return (
    <>
      {
        // user_data ? console.log(user_data["trips"][0]) : ""
        // console.log(userData)
        userData["trips"] ? console.log(userData["trips"][0]) : ""
        // console.log(TripArray)
      }
      <div className="user border border-gray-500 h-screen m-8">
        {userData.name ? <UserProfile userData={userData} /> : ""}
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
          {userData["trips"]
            ? userData["trips"].map((trip) => (
                <ProfileTrip key={trip["_id"]} trip={trip} />
              ))
            : ""}
          {/* {console.log(typeof userData["trips"][0])} */}
        </div>
      </div>
    </>
  );
}

export default User;
