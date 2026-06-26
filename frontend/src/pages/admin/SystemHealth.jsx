import { useEffect, useState } from "react";
import API from "../../api/api";

import Navbar from "../../components/common/Navbar";
import StatsCard from "../../components/common/StatsCard";

import {
    PageHeader,
    Badge
} from "../../components/ui";

import {
    Database,
    ShieldCheck,
    Activity,
    KeyRound
} from "lucide-react";

function SystemHealth() {

    const [health, setHealth] = useState(null)

    useEffect(() => {

        API.get("/admin/system-health")
            .then(res => setHealth(res.data))
            .catch(console.error)

    }, [])

    if (!health) {

        return (

            <div className="container">

                <Navbar />

                <PageHeader
                    title="System Health"
                    subtitle="Loading infrastructure status..."
                />

            </div>

        );

    }

    const services = [

        {
            name: "API Gateway",
            status: health.api_status,
            icon: Activity
        },

        {
            name: "Database",
            status: health.database_status,
            icon: Database
        },

        {
            name: "Fraud Engine",
            status: health.fraud_engine,
            icon: ShieldCheck
        },

        {
            name: "Authentication",
            status: health.auth_service,
            icon: KeyRound
        }

    ];

    return (

        <div className="container">

            <Navbar />

            <PageHeader
                title="System Health"
                subtitle="Monitor infrastructure"
            />


            <div className="analyst-cards-grid">

                <StatsCard
                    title="Users"
                    value={health.total_users}
                />

                <StatsCard
                    title="Transactions"
                    value={health.total_transactions}
                />

                <StatsCard
                    title="Fraud Events"
                    value={health.fraud_events}
                />

                <StatsCard
                    title="Active Rules"
                    value={health.active_rules}
                />

            </div>

            <div className="admin-section">

                <PageHeader
                    title="Service Status"
                    subtitle="Current backend infrastructure"
                />

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
                                                : "danger"
                                        }
                                    >
                                        {service.status}
                                    </Badge>

                                </div>

                                <h3>
                                    {service.name}
                                </h3>

                                <p>

                                    {service.status === "ONLINE"

                                        ? "Service operating normally."

                                        : "Service requires attention."}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

            <div className="admin-section">

                <PageHeader
                    title="Latest Activity"
                    subtitle="Most recent system event"
                />

                <div className="admin-control-card">

                    <h3>
                        Most Recent Audit Event
                    </h3>

                    <p>
                        {health.latest_activity}
                    </p>

                </div>

            </div>

        </div>

    )

}

export default SystemHealth