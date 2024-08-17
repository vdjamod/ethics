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
import UserHome from "./components/User/UserHome";
import EditProfile from "./components/User/EditProfile";
import User from "./components/User/User";
import ProfileSetting from "./components/User/ProfileSetting";
import Search from "./components/User/Search";

//Trip
import NewTrip from "./components/Trip/NewTrip";

//Chat
import Chat from "./components/Chat/Chat";

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
          <Route path="/:username/editProfile" element={<EditProfile />} />
          <Route path="/:username/" element={<User />} />
          <Route
            path="/:username/profilesetting"
            element={<ProfileSetting />}
          />
          <Route path="/:username" element={<Search />} />

          {/* Trip */}
          <Route path="/:username/newtrip" element={<NewTrip />} />

          {/* Chat */}
          <Route path="/:username/chat" element={<Chat />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
