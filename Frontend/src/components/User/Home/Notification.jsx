import { useState, useEffect } from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Notification() {
  const { username } = useParams();
  const navigate = useNavigate();
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

  const handelAccept = async (trip_id) => {
    try {
      const response = await axios.get(
        `/API/${username}/notification/accept/${trip_id}`
      );
      // Navigate to the same route to trigger a refresh
      navigate(0); // or navigate(window.location.pathname) for more specific
    } catch (error) {
      alert(error);
    }
  };
  const handelReject = async (trip_id) => {
    try {
      const response = await axios.get(
        `/API/${username}/notification/reject/${trip_id}`
      );
      // Navigate to the same route to trigger a refresh
      navigate(0); // or navigate(window.location.pathname) for more specific
    } catch (error) {
      alert(error);
    }
  };
  const handelRemove = async (trip_id) => {
    try {
      const response = await axios.get(
        `/API/${username}/notification/remove/${trip_id}`
      );
      // Navigate to the same route to trigger a refresh
      navigate(0); // or navigate(window.location.pathname) for more specific
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {notification ? (
        <>
          {notification.map((noti, idx) => {
            {
              console.log(noti);
            }
            return (
              <div key={idx} className="">
                {/* <Link to={`/${noti.by}/${noti.trip_id}`}>
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
                </Link> */}
                <div className="flex flex-col p-8 bg-white shadow-md hover:shodow-lg rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <div className="flex flex-col ml-3">
                        <div className="font-medium leading-none">
                          {noti.name}{" "}
                          <Link to={`/${noti.by}/trip/${noti.trip_id}`}>
                            ->
                          </Link>
                        </div>
                        <p className=" text-gray-600 leading-none mt-1">
                          {noti.details}
                        </p>
                        <p className="opacity-70 text-sm">{noti.date}</p>
                      </div>
                    </div>
                    {!noti.request ? (
                      <span>
                        <button
                          onClick={() => handelAccept(noti.trip_id)}
                          className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
                        >
                          Accept
                        </button>
                        {"  "}
                        <button
                          onClick={() => handelReject(noti.trip_id)}
                          className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
                        >
                          Reject
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => handelRemove(noti.trip_id)}
                        className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
                      >
                        Remove
                      </button>
                    )}
                    {/* <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
                      Delete
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
      <div className=""></div>
    </>
  );
}

export default Notification;
