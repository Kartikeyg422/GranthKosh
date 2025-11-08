import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const location = useLocation();
  const user = localStorage.getItem("user");

  if (!user) {
    // Redirect to login with the current location as state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userData = JSON.parse(user);

  // Check if admin route requires admin role
  if (requireAdmin && userData.role !== "admin") {
    // Redirect non-admin users to home
    return <Navigate to="/" replace />;
  }

  return children;
}

