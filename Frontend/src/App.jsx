import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Utils
// import Header from "./components/Utils/Header";
import Footer from "./components/Utils/Footer";
import PageNotFound from "./components/Utils/PageNotFound";
import Home from "./components/Utils/Home";

//User
import Signin from "./components/User/Signin";
import Registration from "./components/User/Registration";
import UserHome from "./components/User/UserHome";
import EditProfile from "./components/User/EditProfile";
import User from "./components/User/User";

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />

          {/* User */}
          <Route path="/signin " element={<Signin />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/editProfile" element={<EditProfile />} />
          <Route path="/user/" element={<User />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
