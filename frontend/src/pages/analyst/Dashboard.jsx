import { useEffect, useState } from "react"

import API from "../../api/api";

import StatsCard from "../../components/common/StatsCard"
import FraudTable from "../../components/common/FraudTable"
import Navbar from "../../components/common/Navbar"

import {
    PageHeader,
    Card,
    Button,
    ErrorState,
    CardSkeleton
} from "../../components/ui";

function Dashboard() {

    const [stats, setStats] = useState({})
    const [recent, setRecent] = useState([])
    const [highRisk, setHighRisk] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    const fetchDashboard = () => {

        setLoading(true);
        setError("");

        Promise.all([
            API.get("/dashboard/stats"),
            API.get("/dashboard/recent"),
            API.get("/dashboard/high-risk")
        ])
            .then(([statsRes, recentRes, highRiskRes]) => {

                setStats(statsRes.data);

                setRecent(recentRes.data);

                setHighRisk(highRiskRes.data);

            })
            .catch(() => {

                setError("Unable to load dashboard.");

            })
            .finally(() => {

                setLoading(false);

            });

    };

    useEffect(() => {

        fetchDashboard();

    }, [])

    if (loading) {

        return (

            <div className="container">

                <Navbar />

                <PageHeader
                    title="Fraud Monitoring Center"
                    subtitle="Real-time fraud detection and investigation system"
                    actions={
                        <Button
                            variant="secondary"
                            onClick={fetchDashboard}
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
                title="Fraud Monitoring Center"
                subtitle="Real-time fraud detection and investigation system"
                actions={
                    <Button
                        variant="secondary"
                        onClick={fetchDashboard}
                    >
                        Refresh
                    </Button>
                }
            />

            <div className="analyst-cards-grid">

                <StatsCard
                    title="Transactions"
                    value={stats.total_transactions || 0}
                />

                <StatsCard
                    title="Flagged"
                    value={stats.flagged || 0}
                />

                <StatsCard
                    title="Blocked"
                    value={stats.blocked || 0}
                />

                <StatsCard
                    title="Fraud Events"
                    value={stats.fraud_events || 0}
                />

                <StatsCard
                    title="High Risk"
                    value={highRisk.length}
                />

                <StatsCard
                    title="Fraud Rate"
                    value={`${stats.fraud_rate || 0}%`}
                />

            </div>

            <Card
                title="Recent Fraud Events"
                subtitle="Latest detected fraud events requiring review"
            >

                <FraudTable
                    data={recent}
                />

            </Card>

            <Card
                title="High Risk Transactions"
                subtitle="Transactions with elevated fraud risk scores"
            >

                <FraudTable
                    data={highRisk}
                />

            </Card>

        </div>

    )

}

export default Dashboard