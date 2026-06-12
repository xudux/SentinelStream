import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"


import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import TransactionMonitor from "./pages/TransactionMonitor"
import TransactionDetails from "./pages/TransactionDetails"
import AuditLogs from "./pages/AuditLogs"
import FraudEvents from "./pages/FraudEvents"
import Users from "./pages/Users"
import Analytics from "./pages/Analytics"

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/transactions"
                    element={<Transactions />}
                />

                <Route
                    path="/monitor"
                    element={<TransactionMonitor />}
                />

                <Route
                    path="/transactions/:id"
                    element={<TransactionDetails />}
                />

                <Route
                    path="/audit-logs"
                    element={<AuditLogs />}
                />

                <Route
                    path="/fraud-events"
                    element={<FraudEvents />}
                />

                <Route
                    path="/users"
                    element={<Users />}
                />

                <Route
                    path="/analytics"
                    element={<Analytics />}
                />

            </Routes>

        </BrowserRouter>

    )

}

export default App