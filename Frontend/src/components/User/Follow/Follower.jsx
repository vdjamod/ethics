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
  }, []);
  return (
    <>
      {userData["followers"]
        ? userData["followers"].map((follower, idx) => (
            <p key={idx}>{follower}</p>
          ))
        : ""}
    </>
  );
}

export default Follower;
