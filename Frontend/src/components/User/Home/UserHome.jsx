import { useState, useEffect } from "react";

import UserHeader from "../UserHeader";
import HomeFriendCard from "./HomeFriendCard";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function UserHome() {
  const [recentActivity, setRecentActivity] = useState([]);
  const [TOKEN_USERNAME, setTOKEN_USERNAME] = useState("");

  useEffect(() => {
    async function getData() {
      let token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);

          // Now you can access the username or any other information from the token payload
          let TOKENUSERNAME =
            decodedToken.username || decodedToken.sub || decodedToken.email;
          setTOKEN_USERNAME(TOKENUSERNAME);

          const response = await axios.get(
            `/API/${TOKENUSERNAME}/recentactivity`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const recent_activity = response.data; // Extract data from the response

          setRecentActivity(recent_activity);
        } catch (error) {
          alert(error);
        }
      }
    }
    getData();
  }, []);
  return (
    <>
      <UserHeader />
      <div className="user-home text-center flex">
        <div className="part-A w-1/5 h-screen  invisible md:visible">
          Part A
        </div>
        <div className="part-Main p-4 border border-gray-200 w-4/5 sm:w-full align-center">
          {recentActivity ? (
            <>
              {recentActivity.map((activity) => (
                // eslint-disable-next-line react/jsx-key
                <Link
                  to={`/${activity.username}/trip/${activity["_id"]}`}
                  key={activity["_id"]}
                >
                  <HomeFriendCard activity={activity} />
                </Link>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="part-B w-1/5 h-screen invisible md:visible">Part B</div>
        {/* <FetchProtectedData /> */}
      </div>
    </>
  );
}

export default UserHome;
