import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Trip() {
  const { username, tripid } = useParams();
  const [tripData, setTripData] = useState({});
  let trip_data;
  useEffect(() => {
    async function getData() {
      trip_data = (await axios.get(`/API/${username}/trip/${tripid}`)).data;
      setTripData(trip_data);
    }
    getData();
  }, []);
  return (
    <>
      {tripData["_id"] ? (
        <>
          <h1>
            {tripData.Trip_Name} <span>{tripData.status}</span>
          </h1>
          <span> {tripData.date}</span>
          <br />
          <h4>
            {tripData.source}
            {tripData.destination.map((name, idx) => (
              <span className="opacity-75" key={idx}>
                {" "}
                {name}
              </span>
            ))}
          </h4>
          <p>{tripData.discription}</p>
          <p>
            {/* {tripData.friends.map((name, idx) => (
              <span key={idx}> {name}</span>
            ))} */}
            {tripData.friends}
          </p>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Trip;
