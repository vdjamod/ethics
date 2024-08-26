import React from "react";

function HomeFriendCard({ activity }) {
  return (
    <>
      {console.log(activity)}
      <div className="w-full h-32 p-2  border border-gray-500 mb-2 bg-gray-300">
        <p>{activity.Trip_Name}</p>
        <p className="mb-2">
          {activity.source}
          {activity.destination.map((name, idx) => {
            // console.log(name);
            return (
              <span className="opacity-70" key={idx}>
                {" "}
                ->{name}{" "}
              </span>
            );
          })}
        </p>
        <p className="opacity-50 font-light ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
          molestiae exercitationem est. Minus delectus repudiandae aliquam rem.
          Ad, atque accusantium, mollitia reiciendis debitis necessitatibus,
          autem id quae cumque minus officia?
        </p>
      </div>
    </>
  );
}
export default HomeFriendCard;
