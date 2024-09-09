// components/PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./auth";

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
