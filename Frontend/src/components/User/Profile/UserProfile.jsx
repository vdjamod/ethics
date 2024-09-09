import { Link } from "react-router-dom";

function UserProfile({ userData }) {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto mt-6">
      <div className="w-full flex flex-col items-center mb-6">
        <div className="profile-picture mb-4">
          <img
            src={userData["profile_picture"]}
            alt={`${userData.username}'s profile`}
            className="rounded-full w-32 h-32 object-cover border-4 border-blue-500"
          />
        </div>
        <div className="info text-center">
          <p className="text-lg font-semibold text-gray-800">
            @{userData.username}
          </p>
          <p className="text-sm text-gray-600">{userData.bio}</p>
          {userData.website && (
            <a
              className="text-blue-600 hover:underline mt-2 block"
              href={userData.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userData.website}
            </a>
          )}
        </div>
      </div>
      <div className="flex justify-around w-full border-t pt-4 mt-2 text-center text-gray-700">
        <Link
          to={`/${userData.username}/following/list`}
          className="text-sm hover:text-blue-500"
        >
          Followings:{" "}
          <span className="font-medium">
            {userData.followings ? userData.followings.length : 0}
          </span>
        </Link>
        <Link
          to={`/${userData.username}/follower/list`}
          className="text-sm hover:text-blue-500"
        >
          Followers:{" "}
          <span className="font-medium">
            {userData.followers ? userData.followers.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
