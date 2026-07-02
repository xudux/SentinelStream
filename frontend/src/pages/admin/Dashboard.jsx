import { useEffect, useState } from "react"

import API from "../../api/api"

import Navbar from "../../components/common/Navbar"
import {
    PageHeader,
    Button,
    Badge,
    EmptyState,
    ErrorState,
    Card,
    CardSkeleton
} from "../../components/ui";

import StatsCard from "../../components/common/StatsCard";

function Dashboard() {

    const [stats, setStats] = useState({})

    const [users, setUsers] = useState([])

    const [auditLogs, setAuditLogs] = useState([])

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDashboard = () => {

        setLoading(true);
        setError("");

        Promise.all([
            API.get("/dashboard/stats"),
            API.get("/users/all"),
            API.get("/admin/audit-logs")
        ])

        .then(([statsRes, usersRes, logsRes]) => {

            setStats(statsRes.data);

            setUsers(
                [...usersRes.data].sort((a, b) => b.id - a.id)
            );

            setAuditLogs(
                logsRes.data
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 5)
            );

        })

        .catch(() => {

            setError("Unable to load dashboard.");

        })

        .finally(() => {

            setLoading(false);

        });

    }

    const resetBalances = () => {

        if (
            !window.confirm(
                "Reset all user balances?"
            )
        ) {
            return
        }

        API.post(
            "/admin/reset-balances"
        )

        .then(res => {

            alert(
                `Updated ${res.data.users_updated} users`
            );

            fetchDashboard();

        })

        .catch(() => {
            setError("Unable to reset user balances.");
        });

    }

    useEffect(() => {

        fetchDashboard();

    }, []);

    if (loading) {

        return (

            <div className="container">

                <Navbar />

                <PageHeader
                    title="SentinelStream Admin Console"
                    subtitle="Platform administration and system overview"
                />

                <div className="analyst-cards-grid">

                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />

                </div>

            </div>

        );

    }

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

    return (

        <div className="container">

            <Navbar />

            <PageHeader

                title="SentinelStream Admin Console"

                subtitle="Platform administration and system overview"

            />

            <div className="analyst-cards-grid">
                <StatsCard
                    title="Total Users"
                    value={users.length}
                />

                <StatsCard
                    title="Transactions"
                    value={stats.total_transactions || 0}
                />

                <StatsCard
                    title="Fraud Events"
                    value={stats.fraud_events || 0}
                />

                <StatsCard
                    title="Investigations"
                    value={stats.blocked || 0}
                />

                <StatsCard
                    title="Fraud Rate"
                    value={`${stats.fraud_rate || 0}%`}
                />

            </div>

            <Card
                title="Recent Audit Logs"
                subtitle="Latest administrative and system activity"
            >

                <table className="ui-table">

                    <thead>

                        <tr>

                            <th>User</th>

                            <th>Action</th>

                            <th>Details</th>

                            <th>Time</th>

                        </tr>

                    </thead>

                    <tbody>

                    {
                    auditLogs.length===0 ? (

                        <tr>

                            <td colSpan="4">

                                <EmptyState
                                    title="No audit logs"
                                    description="Recent administrative activity will appear here."
                                />

                            </td>

                        </tr>

                    ) : (

                        auditLogs.map(log => (

                            <tr key={log.id}>

                                <td>

                                    {log.user_id}

                                </td>

                                <td>

                                    <Badge
                                        variant={
                                            log.action==="TRANSACTION_BLOCKED"
                                            ? "danger"
                                            : log.action==="FRAUD_EVENT_CREATED"
                                            ? "warning"
                                            : "primary"
                                        }
                                    >

                                        {log.action}

                                    </Badge>

                                </td>

                                <td>

                                    {log.details}

                                </td>

                                <td>

                                    {
                                    new Date(
                                    log.created_at
                                    ).toLocaleString()
                                    }

                                </td>

                            </tr>

                        ))

                    )

                    }

                    </tbody>

                </table>

            </Card>

            <Card
                title="System Controls"
                subtitle="Administrative tools for system maintenance"
            >

                <div>

                    <h3>
                        Reset User Balances
                    </h3>

                    <p>
                        Restore every account balance
                        to ₹10,000.
                    </p>

                    <Button
                        variant="danger"
                        onClick={resetBalances}
                    >
                        Reset Balances
                    </Button>

                </div>

            </Card>

        </div>

    )

}

export default Dashboard