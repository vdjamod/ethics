// eslint-disable-next-line react/prop-types
function ProfileTrip({ trip }) {
  return (
    <>
      <div className="w-full p-6 border mb-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Trip Name */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {trip.Trip_Name}
        </h3>

        {/* Source and Destinations */}
        <div className="text-gray-600 mb-4">
          <span className="font-medium">Source:</span> {trip.source}
          <div className="mt-1 flex flex-wrap items-center">
            <span className="font-medium mr-1">Destinations:</span>
            {trip.destination.map((name, idx) => (
              <span className="text-sm text-gray-500 opacity-80 mx-1" key={idx}>
                {name}
                {idx < trip.destination.length - 1 && (
                  <span className="mx-1 text-gray-400">→</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 font-light text-sm truncate">
          {trip.discription}
        </p>
      </div>
    </>
  );
}

export default ProfileTrip;
