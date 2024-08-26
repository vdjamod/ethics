// eslint-disable-next-line react/prop-types
function ProfileTrip({ trip }) {
  return (
    <>
      <div className="w-full h-32 p-6 border mb-2 border-gray-200 bg-gray-300 truncate">
        <p>{trip.Trip_Name}</p>
        <p className="mb-2">
          {trip.source}
          {trip.destination.map((name, idx) => {
            // console.log(name);
            return (
              <span className="opacity-70" key={idx}>
                {" "}
                ->{name}{" "}
              </span>
            );

            // <span className="opacity-70">{name}</span>;
          })}
        </p>
        {/* {console.log(trip.destination)} */}
        <p className="opacity-50 font-light truncate">
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
