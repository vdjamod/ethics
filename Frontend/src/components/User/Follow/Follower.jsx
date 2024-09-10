import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Follower() {
  const { username } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getData() {
      const user_data = (await axios.get(`/API/${username}`)).data;
      setUserData(user_data);
    }
    getData();
  }, [username]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      {/* {userData["followers"]
        ? userData["followers"].map((follower, idx) => (
            <p key={idx}>{follower}</p>
          ))
        : ""} */}
      <h2 className="text-xl font-semibold mb-4">Followers</h2>
      {userData["followers"] ? (
        <ul className="space-y-4">
          {userData["followers"].map((follower, idx) => (
            <li
              key={idx}
              className="flex items-center space-x-4 border-b pb-2 last:border-none"
            >
              {/* Placeholder for profile picture */}
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">{follower}</p>
                <p className="text-sm text-gray-500">{follower.username}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No followers found.</p>
      )}
    </div>
  );
}

export default Follower;
