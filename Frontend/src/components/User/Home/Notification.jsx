import { useState, useEffect } from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function Notification() {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    async function getData() {
      let token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);

          // Now you can access the username or any other information from the token payload
          let TOKENUSERNAME =
            decodedToken.username || decodedToken.sub || decodedToken.email;

          const response = await axios.get(
            `/API/${TOKENUSERNAME}/notification`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const recent_activity = response.data; // Extract data from the response

          setNotification(recent_activity);
        } catch (error) {
          alert(error);
        }
      }
    }
    getData();
  }, []);
  return (
    <>
      Hello
      {notification ? (
        <>
          {notification.map((noti, idx) => {
            {
              console.log(noti);
            }
            return (
              <div key={idx} className="">
                <Link to={`/${noti.by}/${noti.trip_id}`}>
                  <p>
                    {noti.name} From <a href={`/${noti.by}`}>{noti.by}</a>
                  </p>
                  <p>{noti.details}</p>
                  {!noti.request ? (
                    <span>
                      <a href="/accept">Accept</a>
                      {"  "}
                      <a href="/reject">Reject</a>
                    </span>
                  ) : (
                    <span>Remove</span>
                  )}
                  <p className="opacity-70">{noti.date}</p>
                </Link>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Notification;
