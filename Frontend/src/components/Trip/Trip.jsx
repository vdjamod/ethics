import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// function Trip() {
//   const { username, tripid } = useParams();
//   const [tripData, setTripData] = useState({});
//   let trip_data;
//   useEffect(() => {
//     async function getData() {
//       trip_data = (await axios.get(`/API/${username}/trip/${tripid}`)).data;
//       setTripData(trip_data);
//     }
//     getData();
//   }, []);
//   return (
//     <>
//       {tripData["_id"] ? (
//         <>
//           <h1>
//             {tripData.Trip_Name} <span>{tripData.status}</span>
//           </h1>
//           <span> {tripData.date}</span>
//           <br />
//           <h4>
//             {tripData.source}
//             {tripData.destination.map((name, idx) => (
//               <span className="opacity-75" key={idx}>
//                 {" "}
//                 {name}
//               </span>
//             ))}
//           </h4>
//           <p>{tripData.discription}</p>
//           <p>
//             {/* {tripData.friends.map((name, idx) => (
//               <span key={idx}> {name}</span>
//             ))} */}
//             {tripData.friends}
//           </p>
//         </>
//       ) : (
//         ""
//       )}
//     </>
//   );
// }

// export default Trip;

import React from "react";

const Trip = () => {
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
      {tripData ? (
        <>
          <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
            <div className="container mx-auto">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                  <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                    <span className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-black sm:text-4xl md:text-[40px]">
                      {" "}
                      {tripData.Trip_Name}{" "}
                    </span>
                    <span>{tripData.status}</span> <span> {tripData.date}</span>
                    <br />
                    <br />
                    <span className="mb-2 block text-lg font-semibold text-primary">
                      {tripData.source}
                      {tripData.destination
                        ? tripData.destination.map((name, idx) => {
                            return (
                              <span className="opacity-75" key={idx}>
                                {" "}
                                {name}
                              </span>
                            );
                          })
                        : ""}
                    </span>
                    <p className="text-base text-body-color dark:text-dark-6">
                      {tripData.discription}
                    </p>
                    <p className="text-base text-body-color dark:text-dark-6">
                      {tripData.friends}
                    </p>
                  </div>
                </div>
              </div>

              <div className="-mx-4 flex flex-wrap justify-center">
                {tripData.photos
                  ? tripData.photos.map((link, idx) => {
                      return <TeamCard key={idx} imageSrc={link} />;
                    })
                  : ""}
              </div>
            </div>
          </section>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Trip;

const TeamCard = ({ imageSrc }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 xl:w-1/4">
        <div className="mx-auto mb-10 w-full max-w-[370px]">
          <div className="relative overflow-hidden rounded-lg">
            <img src={imageSrc} alt="" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <TeamCard
                  name="Coriss Ambady"
                  profession="Web Developer"
                  imageSrc="https://i.ibb.co/T1J9LD4/image-03-2.jpg"
                />
                <TeamCard
                  name="Coriss Ambady"
                  profession="Web Developer"
                  imageSrc="https://i.ibb.co/8P6cvVy/image-01-1.jpg"
                />
                <TeamCard
                  name="Coriss Ambady"
                  profession="Web Developer"
                  imageSrc="https://i.ibb.co/30tGtjP/image-04.jpg"
                />
                <TeamCard
                  name="Coriss Ambady"
                  profession="Web Developer"
                  imageSrc="https://i.ibb.co/yVVT0Dp/image-02-2.jpg"
                /> */
}
