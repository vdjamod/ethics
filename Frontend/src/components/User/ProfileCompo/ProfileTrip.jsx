import React from "react";

// eslint-disable-next-line react/prop-types
function ProfileTrip({ trip }) {
  return (
    <>
      <div className="w-full h-32 p-6 border mb-2 border-gray-200 bg-gray-300">
        {/* {console.log(trip)} */}
        <p>{trip["Trip_Name"]}</p>
        <p className="mb-2">
          {trip.source}
          {trip.destination.map((name) => {
            <span className="opacity-70">{name}</span>;
          })}
        </p>
        <p className="opacity-50 font-light">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
          molestiae exercitationem est. Minus delectus repudiandae aliquam rem.
          Ad, atque accusantium, mollitia reiciendis debitis necessitatibus,
          autem id quae cumque minus officia?
        </p>
      </div>
    </>
  );
}

export default ProfileTrip;
