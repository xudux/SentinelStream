import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/auth/Login";

// CUSTOMER
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerTransactions from "./pages/customer/Transactions";
import CustomerProfile from "./pages/customer/Profile";
// ANALYST
import AnalystDashboard from "./pages/analyst/Dashboard";
import TransactionMonitor from "./pages/analyst/TransactionMonitor";
import FraudEvents from "./pages/analyst/FraudEvents";
import Analytics from "./pages/analyst/Analytics";
import Investigations from "./pages/analyst/Investigations";
import InvestigationDetails from "./pages/analyst/InvestigationDetails";

// ADMIN
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Rules from "./pages/admin/Rules";
import AuditLogs from "./pages/admin/AuditLogs";
import SystemHealth from "./pages/admin/SystemHealth"

import TransactionDetails from "./pages/TransactionDetails";

import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* PUBLIC */}

                <Route
                    path="/"
                    element={<Login />}
                />

                {/* =========================
                    CUSTOMER ROUTES
                ========================= */}

                <Route
                    path="/customer/dashboard"
                    element={
                        <ProtectedRoute
                            allowedRoles={["USER"]}
                        >
                            <CustomerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customer/transactions"
                    element={
                        <ProtectedRoute
                            allowedRoles={["USER"]}
                        >
                            <CustomerTransactions />
                        </ProtectedRoute>
                    }
                />

                {/* Future */}
                {
                <Route
                    path="/customer/profile"
                    element={
                        <ProtectedRoute
                            allowedRoles={["USER"]}
                        >
                            <CustomerProfile />
                        </ProtectedRoute>
                    }
                />
                }

                {/* =========================
                    ANALYST ROUTES
                ========================= */}

                <Route
                    path="/analyst/dashboard"
                    element={
                        <ProtectedRoute
                            allowedRoles={["FRAUD_ANALYST"]}
                        >
                            <AnalystDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analyst/monitor"
                    element={
                        <ProtectedRoute
                            allowedRoles={["FRAUD_ANALYST"]}
                        >
                            <TransactionMonitor />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analyst/fraud-events"
                    element={
                        <ProtectedRoute
                            allowedRoles={["FRAUD_ANALYST"]}
                        >
                            <FraudEvents />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analyst/analytics"
                    element={
                        <ProtectedRoute
                            allowedRoles={["FRAUD_ANALYST"]}
                        >
                            <Analytics />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analyst/investigations"
                    element={
                        <ProtectedRoute
                            allowedRoles={["FRAUD_ANALYST"]}
                        >
                            <Investigations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analyst/investigations/:id"
                    element={
                        <ProtectedRoute
                            allowedRoles={["FRAUD_ANALYST"]}
                        >
                            <InvestigationDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analyst/transactions/:id"
                    element={
                        <ProtectedRoute
                            allowedRoles={["FRAUD_ANALYST"]}
                        >
                            <TransactionDetails />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
                    ADMIN ROUTES
                ========================= */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute
                            allowedRoles={["ADMIN"]}
                        >
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute
                            allowedRoles={["ADMIN"]}
                        >
                            <Users />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/rules"
                    element={
                        <ProtectedRoute
                            allowedRoles={["ADMIN"]}
                        >
                            <Rules />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/audit-logs"
                    element={
                        <ProtectedRoute
                            allowedRoles={["ADMIN"]}
                        >
                            <AuditLogs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/system-health"
                    element={
                        <ProtectedRoute
                            allowedRoles={["ADMIN"]}
                        >
                            <SystemHealth />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;