// components/PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedGetUsername } from "./auth";

const PublicRoute = () => {
  let username = isAuthenticatedGetUsername();
  return username ? <Navigate to={`/${username}/home`} /> : <Outlet />;
};

export default PublicRoute;
