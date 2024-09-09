import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProfileTrip from "./ProfileTrip";
import UserProfile from "./UserProfile";
import WentWrong from "../../Alert/WentWrong";
import { jwtDecode } from "jwt-decode";
import Breadcrumbs from "./Breadcrumbs";
import Logout from "./Logout";

function User() {
  const token = localStorage.getItem("token");
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

      try {
        const response = await axios.get(`/API/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user_data = response.data;
        setUserData(user_data);
      } catch (error) {
        navigate("/pagenotfound");
      }

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const TOKENUSERNAME =
            decodedToken.username || decodedToken.sub || decodedToken.email;
          setTOKEN_USERNAME(TOKENUSERNAME);
          setUserIsValid(TOKENUSERNAME === username);
        } catch (error) {
          <WentWrong />;
        }
      }
    }
    getData();
  }, [username, navigate]);

  const searchChangeHandler = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const filter_data = userData["trips"].filter((value) => {
      return value.Trip_Name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(searchWord === "" ? userData["trips"] : filter_data);
  };

  const handleFollow = async () => {
    try {
      if (TOKEN_USERNAME) {
        await axios.get(`/API/${TOKEN_USERNAME}/following/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate(0);
      }
    } catch (error) {
      <WentWrong />;
    }
  };

  const handleUnfollow = async () => {
    try {
      if (TOKEN_USERNAME) {
        await axios.get(`/API/${TOKEN_USERNAME}/unfollow/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate(0);
      }
    } catch (error) {
      <WentWrong />;
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 max-w-4xl mx-auto mt-8">
      {userData ? (
        <>
          {TOKEN_USERNAME && <Breadcrumbs username={TOKEN_USERNAME} />}
          <UserProfile userData={userData} />
          <div className="flex justify-center items-center mt-6">
            {userIsValid ? (
              <div className="flex space-x-4">
                <Link
                  className="focus:outline-none text-white bg-cyan-100 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900"
                  to={`/${userData.username}/profilesetting`}
                >
                  Settings
                </Link>
                <Logout />
              </div>
            ) : (
              TOKEN_USERNAME && (
                <button
                  onClick={
                    !userData.followers ||
                    !userData.followers.includes(TOKEN_USERNAME)
                      ? handleFollow
                      : handleUnfollow
                  }
                  className={`py-2 px-4 rounded text-white font-semibold ${
                    !userData.followers ||
                    !userData.followers.includes(TOKEN_USERNAME)
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {!userData.followers ||
                  !userData.followers.includes(TOKEN_USERNAME)
                    ? "Follow"
                    : "Unfollow"}
                </button>
              )
            )}
          </div>
          <div className="mt-4 text-center">
            <input
              onChange={searchChangeHandler}
              value={wordEntered}
              placeholder="Search trips..."
              className="border border-gray-300 rounded py-2 px-4 w-3/4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="ml-2 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900">
              Search Trip
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-6">
            {(filteredData.length ? filteredData : userData["trips"])
              .reverse()
              .map((trip) => (
                <Link to={`/${username}/trip/${trip["_id"]}`} key={trip["_id"]}>
                  <ProfileTrip trip={trip} />
                </Link>
              ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default User;
