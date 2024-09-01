import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Utils
// import Header from "./components/Utils/Header";
import Footer from "./components/Utils/Footer";
import PageNotFound from "./components/Utils/PageNotFound";
import Home from "./components/Utils/Home";

//User
import Signin from "./components/User/SignIn";
import Registration from "./components/User/Registration";
import UserHome from "./components/User/Home/UserHome";
import User from "./components/User/Profile/User";
import ProfileSetting from "./components/User/Profile/ProfileSetting";

//Trip
import NewTrip from "./components/Trip/NewTrip";
import Trip from "./components/Trip/Trip";

//Chat
import Chat from "./components/Chat/Chat";

//Search
import Search from "./components/User/Home/Search";

//Follow
import Follower from "./components/User/Follow/Follower";
import Following from "./components/User/Follow/Following";

//notification
import Notification from "./components/User/Home/Notification";

//Utils
import AboutUs from "./components/Utils/AboutUs";
import ContactUs from "./components/Utils/ContactUs";

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* User */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/:username/home" element={<UserHome />} />
          {/* <Route path="/:username/editProfile" element={<EditProfile />} /> */}
          <Route path="/:username/" element={<User />} />
          <Route
            path="/:username/profilesetting"
            element={<ProfileSetting />}
          />
          <Route path="/:username" element={<Search />} />
          {/* Trip */}
          <Route path="/:username/newtrip" element={<NewTrip />} />
          <Route path="/:username/trip/:tripid" element={<Trip />} />
          {/* Follow */}
          <Route path="/:username/follower/list" element={<Follower />} />
          <Route path="/:username/following/list" element={<Following />} />
          {/* Chat */}
          <Route path="/:username/chat" element={<Chat />} />
          {/* Search */}
          <Route path="/:username/search" element={<Search />} />

          {/* notification */}
          <Route path="/:username/notification" element={<Notification />} />

          {/* Footer Utils */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />

          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
