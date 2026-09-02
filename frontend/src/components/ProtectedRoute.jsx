import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser } from "../utils/auth";

const ProtectedRoute = ({ allowedRole }) => {
  const token = getToken();
  const user = getUser();

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role is not allowed
  if (allowedRole && user.role !== allowedRole) {

    // If admin tries student dashboard
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    // If student tries admin dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;