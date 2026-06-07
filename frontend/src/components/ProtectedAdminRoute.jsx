import { Navigate } from "react-router";

function ProtectedAdminRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  if (!currentUser || !token) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;
