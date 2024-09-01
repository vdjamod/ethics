import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Following() {
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
      {userData["followings"]
        ? userData["followings"].map((following, idx) => (
            <p key={idx}>{following}</p>
          ))
        : ""}
    </>
  );
}

export default Following;
