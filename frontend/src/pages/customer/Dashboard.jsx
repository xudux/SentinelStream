import { useEffect, useState } from "react";
import { useCallback } from "react";

import API from "../../api/api";
import Navbar from "../../components/common/Navbar";

import {
    PageHeader,
    Card,
    Badge,
    EmptyState,
    ErrorState,
    CardSkeleton
} from "../../components/ui";

import StatsCard from "../../components/common/StatsCard";

function Dashboard() {

    const [profile, setProfile] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDashboard = useCallback(() => {

        setLoading(true);
        setError("");

        Promise.all([
            API.get("/users/profile"),
            API.get("/transactions/history")
        ])
        .then(([profileRes, transactionsRes]) => {

            setProfile(profileRes.data);

            setTransactions(
                [...transactionsRes.data].sort((a, b) => b.id - a.id)
            );

        })
        .catch(() => {
            setError("Unable to load dashboard.");
        })
        .finally(() => {
            setLoading(false);
        });

    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    /* ✅ IMPROVED LOADING STATE */
    if (loading) {
        return (
            <div className="container">

                <Navbar />

                <PageHeader
                    title="Customer Dashboard"
                    subtitle="Loading your account..."
                />

                <div className="analyst-cards-grid">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>

                <br />

                <CardSkeleton />

            </div>
        );
    }

    /* ✅ IMPROVED ERROR STATE */
    if (error) {
        return (
            <div className="container">

                <Navbar />

                <ErrorState
                    title="Dashboard unavailable"
                    description={error}
                    onRetry={fetchDashboard}
                />

            </div>
        );
    }

    /* ✅ IMPROVED EMPTY PROFILE */
    if (!profile) {
        return (
            <div className="container">

                <Navbar />

                <EmptyState
                    title="Profile unavailable"
                    description="Unable to load your account information."
                />

            </div>
        );
    }

    return (
        <div className="customer-dashboard theme-customer">

            <Navbar />

            <PageHeader
                title="Customer Dashboard"
                subtitle="Overview of your account activity"
            />

            {/* ✅ UNIFIED GRID */}
            <div className="analyst-cards-grid">

                <StatsCard
                    title="Balance"
                    value={`₹ ${Number(profile.balance).toLocaleString()}`}
                />

                <StatsCard
                    title="Email"
                    value={profile.email}
                />

                <StatsCard
                    title="Transactions"
                    value={transactions.length}
                />

            </div>

            {/* ✅ WRAPPED TABLE IN CARD */}
            <Card title="Recent Transactions">

                <table className="ui-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Merchant</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Risk</th>
                        </tr>
                    </thead>

                    <tbody>

                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan="6">
                                    <EmptyState
                                        title="No Transactions"
                                        description="Your recent transactions will appear here."
                                    />
                                </td>
                            </tr>
                        ) : (
                            transactions.map(tx => (
                                <tr key={tx.id}>
                                    <td>{tx.id}</td>

                                    <td>
                                        ₹ {Number(tx.amount).toLocaleString()}
                                    </td>

                                    <td>{tx.merchant}</td>

                                    <td>{tx.location}</td>

                                    <td>
                                        <Badge
                                            variant={
                                                tx.status === "BLOCKED"
                                                    ? "danger"
                                                    : tx.status === "FLAGGED"
                                                    ? "warning"
                                                    : "success"
                                            }
                                        >
                                            {tx.status}
                                        </Badge>
                                    </td>

                                    <td>
                                        <Badge
                                            variant={
                                                tx.risk_score >= 80
                                                    ? "danger"
                                                    : tx.risk_score >= 50
                                                    ? "warning"
                                                    : "success"
                                            }
                                        >
                                            {Number(tx.risk_score).toFixed(0)}
                                        </Badge>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </Card>

        </div>
    );
}

export default Dashboard;