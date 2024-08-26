import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Logo from "../../../assets/Ethics_Logo.png";
import ProfileTrip from "./ProfileTrip";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import Breadcrumbs from "./Breadcrumbs";
import Logout from "./Logout";

function User() {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [wordEntered, setWordEntered] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [userIsValid, setUserIsValid] = useState(false);
  const [TOKEN_USERNAME, setTOKEN_USERNAME] = useState("");

  useEffect(() => {
    async function getData() {
      let token = localStorage.getItem("token");

      // eslint-disable-next-line react-hooks/exhaustive-deps
      try {
        const response = await axios.get(`/API/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user_data = response.data; // Extract data from the response

        setUserData(user_data); // Log or process the data
      } catch (error) {
        navigate("/pagenotfound");
      }

      if (token) {
        try {
          const decodedToken = jwtDecode(token);

          // Now you can access the username or any other information from the token payload
          let TOKENUSERNAME =
            decodedToken.username || decodedToken.sub || decodedToken.email;
          setTOKEN_USERNAME(TOKENUSERNAME);
          setUserIsValid(TOKENUSERNAME == username);
        } catch (error) {
          console.error("Invalid token:", error);
        }
      } else {
        console.error("No token found");
      }
    }
    getData();
  }, []);
  const searchChangeHandler = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const filter_data = userData["trips"].filter((value) => {
      return value.Trip_Name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData(userData["trips"]);
    } else {
      setFilteredData(filter_data);
    }
  };

  const handelFollow = async () => {
    try {
      if (TOKEN_USERNAME) {
        const response = await axios.get(
          `/API/${TOKEN_USERNAME}/following/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      }
    } catch (error) {
      console.log("Some Error");
    }
  };
  const handelUnfollow = () => {};
  return (
    <>
      <div className="user border border-gray-500  m-8">
        {userData ? (
          <>
            <Breadcrumbs username={TOKEN_USERNAME} />
            <UserProfile userData={userData} />

            <div className="button ">
              {userIsValid ? (
                <div className="buttons justify-center content-end ">
                  <Link
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    to={`/${userData.username}/profilesetting`}
                  >
                    Settings
                  </Link>
                  <button onClick={() => <Logout />}>Logout</button>
                </div>
              ) : !userData.followers ||
                !userData.followers.includes(TOKEN_USERNAME) ? (
                <button
                  onClick={handelFollow}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Follow
                </button>
              ) : (
                <button
                  onClick={handelUnfollow}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Unfollow
                </button>
              )}
              <div className="mt-2 text-center ">
                <input
                  onChange={searchChangeHandler}
                  value={wordEntered}
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
              {filteredData.length
                ? filteredData.reverse().map((trip) => (
                    <Link to={`/${username}/${trip["_id"]}`} key={trip["_id"]}>
                      <ProfileTrip trip={trip} />
                    </Link>
                  ))
                : userData["trips"]
                ? userData["trips"].reverse().map((trip) => (
                    <Link
                      to={`/${username}/trip/${trip["_id"]}`}
                      key={trip["_id"]}
                    >
                      <ProfileTrip trip={trip} />
                    </Link>
                  ))
                : ""}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default User;
