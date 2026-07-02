import { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/common/Navbar";
import {
    PageHeader,
    Badge,
    EmptyState,
    ErrorState,
    Card
} from "../../components/ui";
import StatsCard from "../../components/common/StatsCard";

function AuditLogs() {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [actionFilter, setActionFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchLogs = () => {

        setLoading(true);
        setError("");

        API.get("/admin/audit-logs")
            .then(res => {

                setLogs(
                    [...res.data].sort(
                        (a, b) => b.id - a.id
                    )
                );

            })
            .catch(() => {

                setError("Unable to load audit logs.");

            })
            .finally(() => {

                setLoading(false);

            });

    };

    useEffect(() => {

        fetchLogs();

    }, []);

    const filteredLogs = logs.filter(log => {

        const actionMatch =
            actionFilter === "ALL"
                ? true
                : log.action === actionFilter;

        const searchMatch =
            log.details
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        return actionMatch && searchMatch;

    });

    const loginCount = logs.filter(
        l => l.action === "USER_LOGIN"
    ).length;

    const transactionCount = logs.filter(
        l =>
            l.action === "TRANSACTION_PROCESSED" ||
            l.action === "TRANSACTION_BLOCKED"
    ).length;

    const fraudCount = logs.filter(
        l => l.action === "FRAUD_EVENT_CREATED"
    ).length;

    if (loading) {

        return (

            <div className="container">

                <Navbar />

                <PageHeader
                    title="Audit Log Center"
                    subtitle="Administrative activity monitoring"
                />

                <div>Loading audit logs...</div>

            </div>

        );

    }

    if (error) {

        return (

            <div className="container">

                <Navbar />

                <ErrorState
                    title="Failed to load audit logs"
                    description={error}
                    onRetry={fetchLogs}
                />

            </div>

        );

    }

    return (

        <div className="container">

            <Navbar />

            <PageHeader
                title="Audit Log Center"
                subtitle="Administrative activity monitoring"
            />

            <div className="analyst-cards-grid">

                <StatsCard
                    title="Total Logs"
                    value={logs.length}
                />

                <StatsCard
                    title="Login Events"
                    value={loginCount}
                />

                <StatsCard
                    title="Transaction Events"
                    value={transactionCount}
                />

                <StatsCard
                    title="Fraud Events"
                    value={fraudCount}
                />

            </div>

            <Card
                title="Filters"
                subtitle="Refine the displayed audit logs"
            >

                <div className="table-toolbar">

                    <select
                        className="ui-select"
                        value={actionFilter}
                        onChange={(e) =>
                            setActionFilter(e.target.value)
                        }
                    >

                        <option value="ALL">
                            All Actions
                        </option>

                        <option value="USER_LOGIN">
                            USER_LOGIN
                        </option>

                        <option value="TRANSACTION_PROCESSED">
                            TRANSACTION_PROCESSED
                        </option>

                        <option value="TRANSACTION_BLOCKED">
                            TRANSACTION_BLOCKED
                        </option>

                        <option value="FRAUD_EVENT_CREATED">
                            FRAUD_EVENT_CREATED
                        </option>

                    </select>

                    <input
                        className="ui-input"
                        type="text"
                        placeholder="Search details..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </Card>

            <Card
                title="Audit Logs"
                subtitle="Recent audit events and system activity"
            >

                <table className="ui-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>User</th>
                            <th>Action</th>
                            <th>Details</th>
                            <th>Time</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredLogs.length === 0 ? (

                                <tr>

                                    <td colSpan="5">

                                        <EmptyState
                                            title="No audit logs"
                                            description="No audit events match the selected filters."
                                        />

                                    </td>

                                </tr>

                            ) : (

                                filteredLogs.map(log => (

                                    <tr key={log.id}>

                                        <td>{log.id}</td>

                                        <td>{log.user_id}</td>

                                        <td>

                                            <Badge
                                                variant={
                                                    log.action === "TRANSACTION_BLOCKED"
                                                        ? "danger"
                                                        : log.action === "FRAUD_EVENT_CREATED"
                                                            ? "warning"
                                                            : "primary"
                                                }
                                            >
                                                {log.action}
                                            </Badge>

                                        </td>

                                        <td>{log.details}</td>

                                        <td>
                                            {new Date(
                                                log.created_at
                                            ).toLocaleString()}
                                        </td>

                                    </tr>

                                ))

                            )
                        }

                    </tbody>

                </table>

            </Card>

        </div>

    );

}

export default AuditLogs;