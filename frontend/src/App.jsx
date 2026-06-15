import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import TransactionMonitor from "./pages/TransactionMonitor";
import TransactionDetails from "./pages/TransactionDetails";
import AuditLogs from "./pages/AuditLogs";
import FraudEvents from "./pages/FraudEvents";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Rules from "./pages/Rules";
import Investigations from "./pages/Investigations";
import InvestigationDetails from "./pages/InvestigationDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                {/* USER + ANALYST + ADMIN */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "USER",
                                "FRAUD_ANALYST",
                                "ADMIN"
                            ]}
                        >
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/transactions"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "USER",
                                "FRAUD_ANALYST",
                                "ADMIN"
                            ]}
                        >
                            <Transactions />
                        </ProtectedRoute>
                    }
                />

                {/* ANALYST + ADMIN */}

                <Route
                    path="/monitor"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "FRAUD_ANALYST",
                                "ADMIN"
                            ]}
                        >
                            <TransactionMonitor />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/fraud-events"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "FRAUD_ANALYST",
                                "ADMIN"
                            ]}
                        >
                            <FraudEvents />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "FRAUD_ANALYST",
                                "ADMIN"
                            ]}
                        >
                            <Analytics />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/investigations"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "FRAUD_ANALYST",
                                "ADMIN"
                            ]}
                        >
                            <Investigations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/investigations/:id"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "FRAUD_ANALYST",
                                "ADMIN"
                            ]}
                        >
                            <InvestigationDetails />
                        </ProtectedRoute>
                    }
                />

                {/* ADMIN ONLY */}

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "ADMIN"
                            ]}
                        >
                            <Users />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/rules"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "ADMIN"
                            ]}
                        >
                            <Rules />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/audit-logs"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "ADMIN"
                            ]}
                        >
                            <AuditLogs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/transactions/:id"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "FRAUD_ANALYST",
                                "ADMIN"
                            ]}
                        >
                            <TransactionDetails />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;