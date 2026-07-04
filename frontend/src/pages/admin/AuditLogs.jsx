import { useEffect, useState } from "react";

import API from "../../api/api";

import Navbar from "../../components/common/Navbar";

import {
    PageHeader,
    Badge,
    Button,
    Card,
    EmptyState,
    ErrorState,
    CardSkeleton,
    Input,
    Select
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

        const query = searchTerm.toLowerCase();

        const searchMatch =
            (log.details || "")
                .toLowerCase()
                .includes(query)
            ||
            (log.action || "")
                .toLowerCase()
                .includes(query)
            ||
            String(log.user_id || "")
                .includes(query);

        return actionMatch && searchMatch;
    });

    const stats = {
        login: 0,
        processed: 0,
        blocked: 0,
        fraud: 0
    };

    logs.forEach(l => {
        if (l.action === "USER_LOGIN") stats.login++;
        if (l.action === "TRANSACTION_PROCESSED") stats.processed++;
        if (l.action === "TRANSACTION_BLOCKED") stats.blocked++;
        if (l.action === "FRAUD_EVENT_CREATED") stats.fraud++;
    });

    if (loading) {

        return (

            <div className="container">

                <Navbar />

                <PageHeader
                    title="Audit Log Center"
                    subtitle="Administrative activity monitoring"
                    actions={
                        <Button
                            variant="secondary"
                            onClick={fetchLogs}
                        >
                            Refresh
                        </Button>
                    }
                />

                <div className="analyst-cards-grid">

                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />

                </div>

                <br />

                <CardSkeleton />

                <br />

                <CardSkeleton />

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
                actions={
                    <Button
                        variant="secondary"
                        onClick={fetchLogs}
                    >
                        Refresh
                    </Button>
                }
            />

            <div className="analyst-cards-grid">

                <StatsCard
                    title="Total Logs"
                    value={logs.length}
                />

                <StatsCard
                    title="Login Events"
                    value={stats.login}
                />

                <StatsCard
                    title="Processed Transactions"
                    value={stats.processed}
                />

                <StatsCard
                    title="Blocked Transactions"
                    value={stats.blocked}
                />

                <StatsCard
                    title="Fraud Events"
                    value={stats.fraud}
                />

            </div>

            <Card
                title="Filters"
                subtitle="Refine the displayed audit logs"
            >

                <div className="table-toolbar">

                    <Select
                        label="Action"
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

                    </Select>

                    <Input
                        label="Search"
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

                                        <td>{log.user_id || "-"}</td>

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

                                        <td
                                            style={{
                                                maxWidth: 320,
                                                wordBreak: "break-word"
                                            }}
                                        >
                                            {log.details}
                                        </td>

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