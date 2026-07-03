import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles
}) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    if (role === "ADMIN") {
      return <Navigate to="/admin/dashboard" />;
    }

    if (role === "FRAUD_ANALYST") {
      return <Navigate to="/analyst/dashboard" />;
    }

    if (role === "USER" || role === "CUSTOMER") {
      return <Navigate to="/customer/dashboard" />;
    }

    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;