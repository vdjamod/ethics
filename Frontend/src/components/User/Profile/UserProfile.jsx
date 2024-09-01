import { Link } from "react-router-dom";
function UserProfile({ userData }) {
  return (
    <>
      <div className="upper h-2/5 xw-full  flex justify-center mb-2">
        <div className="profile-picture ">
          <img
            src={userData["profile_picture"]}
            alt=""
            className="rounded-full"
            width={300}
            height={100}
          />
        </div>
        <div className="info h-full content-center ">
          <p>@{userData.username} </p>
          {/* <p>{userData.name}</p> */}
          <p>{userData.bio}</p>
          <a className="text-blue-600" href={userData.website}>
            {userData.website}
          </a>
          <div className="following-follower">
            {/* {console.log(userData.follower)} */}
            <Link to={`/${userData.username}/following/list`}>
              followings{" "}
              {userData.followings ? (
                userData.followings.length
              ) : (
                <span>0</span>
              )}
            </Link>
            {"  "}
            <Link to={`/${userData.username}/follower/list`}>
              followers{" "}
              {userData.followers ? userData.followers.length : <span>0</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
