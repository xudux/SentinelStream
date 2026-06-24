import {
  Link,
  useNavigate
} from "react-router-dom";

function Navbar() {
  const role =
    localStorage.getItem("role");

  const navigate =
    useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="navbar">
      {
        role === "USER"
        &&
        <>
          <Link to="/customer/dashboard">
            Dashboard
          </Link>

          <Link to="/customer/transactions">
            Transactions
          </Link>

          <Link to="/customer/profile">
            Profile
          </Link>
        </>
      }

      {
        role === "FRAUD_ANALYST"
        &&
        <>
          <Link to="/analyst/dashboard">
            Dashboard
          </Link>

          <Link to="/analyst/monitor">
            Monitor
          </Link>

          <Link to="/analyst/fraud-events">
            Fraud Events
          </Link>

          <Link to="/analyst/investigations">
            Investigations
          </Link>

          <Link to="/analyst/analytics">
            Analytics
          </Link>
        </>
      }

      {
        role === "ADMIN"
        &&
        <>
          <Link to="/admin/dashboard">
            Dashboard
          </Link>

          <Link to="/admin/users">
            Users
          </Link>

          <Link to="/admin/rules">
            Rules
          </Link>

          <Link to="/admin/audit-logs">
            Audit Logs
          </Link>

          <Link to="/admin/system-health">
            System Health
          </Link>
        </>
      }

      <button
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;