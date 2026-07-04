import { useEffect, useState } from "react";
import API from "../../api/api";

import Navbar from "../../components/common/Navbar";
import StatsCard from "../../components/common/StatsCard";

import {
    PageHeader,
    Badge,
    CardSkeleton,
    ErrorState,
    Card,
    Button
} from "../../components/ui";

import {
    Database,
    ShieldCheck,
    Activity,
    KeyRound
} from "lucide-react";

function SystemHealth() {

    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchHealth = () => {

        setLoading(true);
        setError("");

        API.get("/admin/system-health")

            .then(res => {
                setHealth(res.data);
            })

            .catch(() => {
                setError("Unable to load system health.");
            })

            .finally(() => {
                setLoading(false);
            });

    };

    useEffect(() => {
        fetchHealth();
    }, []);

    if (error) {
        return (
            <div className="container">
                <Navbar />

                <ErrorState
                    title="System Health Unavailable"
                    description={error}
                    onRetry={fetchHealth}
                />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container">
                <Navbar />

                <PageHeader
                    title="System Health"
                    subtitle="Loading infrastructure status..."
                />

                <div className="analyst-cards-grid">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>

                <br />

                <CardSkeleton />
            </div>
        );
    }

    const formatActivity = (activity) => {
        if (!activity) return "No recent activity available.";

        const readableMap = {
            TRANSACTION_BLOCKED: "A transaction was blocked by the system.",
            USER_LOGIN: "A user logged into the system.",
        };

        return readableMap[activity] || activity;
    };

    const normalizeStatus = (status) => {
        if (!status) return "UNKNOWN";

        const map = {
            ONLINE: "ONLINE",
            OFFLINE: "OFFLINE",
            UNKNOWN: "UNKNOWN",

            // backend variants → normalized
            CONNECTED: "ONLINE",
            ACTIVE: "ONLINE",
            UP: "ONLINE",

            DISCONNECTED: "OFFLINE",
            DOWN: "OFFLINE",
            FAILED: "OFFLINE",
        };

        return map[status] || "UNKNOWN";
    };

    const services = [
        {
            name: "API Gateway",
            status: normalizeStatus(health?.api_status),
            icon: Activity
        },
        {
            name: "Database",
            status: normalizeStatus(health?.database_status),
            icon: Database
        },
        {
            name: "Fraud Engine",
            status: normalizeStatus(health?.fraud_engine),
            icon: ShieldCheck
        },
        {
            name: "Authentication",
            status: normalizeStatus(health?.auth_service),
            icon: KeyRound
        }
    ];

    return (
        <div className="container">

            <Navbar />

            <PageHeader
                title="System Health"
                subtitle="Monitor infrastructure"
                actions={
                    <Button
                        variant="secondary"
                        onClick={fetchHealth}
                    >
                        Refresh
                    </Button>
                }
            />

            <div className="analyst-cards-grid">

                <StatsCard
                    title="Users"
                    value={health.total_users ?? 0}
                />

                <StatsCard
                    title="Transactions"
                    value={health.total_transactions ?? 0}
                />

                <StatsCard
                    title="Fraud Events"
                    value={health.fraud_events ?? 0}
                />

                <StatsCard
                    title="Active Rules"
                    value={health.active_rules ?? 0}
                />

            </div>

            <Card
                title="Service Status"
                subtitle="Current health and availability of system services"
            >

                <div className="health-grid">

                    {services.map((service) => {

                        const Icon = service.icon;

                        return (
                            <div
                                key={service.name}
                                className="health-card"
                            >
                                <div className="health-card-top">

                                    <span className="health-icon">
                                        <Icon size={22} />
                                    </span>

                                    <Badge
                                        variant={
                                            service.status === "ONLINE"
                                                ? "success"
                                                : service.status === "UNKNOWN"
                                                    ? "warning"
                                                    : "danger"
                                        }
                                    >
                                        {service.status}
                                    </Badge>
                                    <p className="health-meta">
                                        Last checked: {health?.last_checked || "N/A"}
                                    </p>

                                </div>

                                <h3>{service.name}</h3>

                                <p>
                                    {service.status === "ONLINE"
                                        ? "Service operating normally."
                                        : service.status === "UNKNOWN"
                                            ? "Status currently unavailable."
                                            : "Service requires attention."}
                                </p>

                            </div>
                        );

                    })}

                </div>

            </Card>

            <Card
                title="Latest Activity"
                subtitle="Most recent system audit event"
            >
                <div className="card-content">
                    <h3>Most Recent Audit Event</h3>
                    <p>{formatActivity(health?.latest_activity)}</p>
                </div>
            </Card>

        </div>
    );
}

export default SystemHealth;