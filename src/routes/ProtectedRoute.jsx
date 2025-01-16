import { Navigate, Outlet } from "react-router-dom";
import { Store } from "../reduxstate/Store";
import { getAccessToken } from "../reduxstate/TokenSlice";

export const ProtectedRoute = () => {
  const token = getAccessToken(Store.getState());

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
