import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  LayoutDashboard,
  Activity,
  ShieldAlert,
  Search,
  BarChart3,
  Users,
  Settings2,
  ClipboardList,
  HeartPulse,
  User,
  CreditCard,
  LogOut
} from "lucide-react";

import { Button } from "../ui";

function Navbar() {
  const role =
    localStorage.getItem("role");
    console.log("Navbar role:", role);

  const navigate =
    useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="navbar-brand">
        🛡 <span>SentinelStream</span>
      </div>

      <div className="navbar-links">

        {role === "USER" && (
          <>
            <NavLink to="/customer/dashboard">
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/customer/transactions">
              <CreditCard size={18} />
              Transactions
            </NavLink>

            <NavLink to="/customer/profile">
              <User size={18} />
              Profile
            </NavLink>
          </>
        )}

        {role === "FRAUD_ANALYST" && (
          <>
            <NavLink to="/analyst/dashboard">
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/analyst/monitor">
              <Activity size={18} />
              Monitor
            </NavLink>

            <NavLink to="/analyst/fraud-events">
              <ShieldAlert size={18} />
              Fraud Events
            </NavLink>

            <NavLink to="/analyst/investigations">
              <Search size={18} />
              Investigations
            </NavLink>

            <NavLink to="/analyst/analytics">
              <BarChart3 size={18} />
              Analytics
            </NavLink>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <NavLink to="/admin/dashboard">
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/admin/users">
              <Users size={18} />
              Users
            </NavLink>

            <NavLink to="/admin/rules">
              <Settings2 size={18} />
              Rules
            </NavLink>

            <NavLink to="/admin/audit-logs">
              <ClipboardList size={18} />
              Audit Logs
            </NavLink>

            <NavLink to="/admin/system-health">
              <HeartPulse size={18} />
              System Health
            </NavLink>
          </>
        )}

      </div>

      <Button
        variant="danger"
        onClick={logout}
      >
        <LogOut size={18} />
        Logout
      </Button>

    </nav>
  );
}

export default Navbar;