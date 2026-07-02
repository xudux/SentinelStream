import { useEffect, useState } from "react";
import API from "../../api/api";

import Navbar from "../../components/common/Navbar";
import StatsCard from "../../components/common/StatsCard";

import {
    PageHeader,
    Card,
    ErrorState,
    CardSkeleton,
    Skeleton
} from "../../components/ui";

import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar
} from "recharts";

function Analytics() {

    const [stats, setStats] = useState({});
    const [distribution, setDistribution] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAnalytics = () => {

        setLoading(true);
        setError("");

        Promise.all([
            API.get("/dashboard/stats"),
            API.get("/dashboard/status-distribution")
        ])
            .then(([statsRes, distributionRes]) => {

                setStats(statsRes.data);
                setDistribution(distributionRes.data);

            })
            .catch(() => {

                setError("Unable to load analytics.");

            })
            .finally(() => {

                setLoading(false);

            });

    };

    useEffect(() => {

        fetchAnalytics();

    }, []);

    if (loading) {

        return (

            <div className="container">

                <Navbar />

                <PageHeader
                    title="ML Analytics Dashboard"
                    subtitle="Loading fraud analytics..."
                />

                <div className="analyst-cards-grid">

                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />

                </div>

                <br />

                <Skeleton height="400px" />

            </div>

        );

    }

    if (error) {

        return (

            <div className="container">

                <Navbar />

                <ErrorState
                    title="Analytics unavailable"
                    description={error}
                    onRetry={fetchAnalytics}
                />

            </div>

        );

    }

    const chartData = [
        {
            name: "Approved",
            count: distribution.approved || 0
        },
        {
            name: "Flagged",
            count: distribution.flagged || 0
        },
        {
            name: "Blocked",
            count: distribution.blocked || 0
        }
    ];

    return (

        <div className="container">

            <Navbar />

            <PageHeader
                title="ML Analytics Dashboard"
                subtitle="Overview of fraud detection metrics"
            />

            <div className="analyst-cards-grid">

                <StatsCard
                    title="Transactions"
                    value={stats.total_transactions || 0}
                />

                <StatsCard
                    title="Fraud Events"
                    value={stats.fraud_events || 0}
                />

                <StatsCard
                    title="Fraud Rate"
                    value={`${stats.fraud_rate || 0}%`}
                />

            </div>

            <Card
                title="Transaction Status Distribution"
                subtitle="Current distribution of processed transactions"
            >
                <ResponsiveContainer
                    width="100%"
                    height={400}
                >

                    <BarChart data={chartData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            radius={[6, 6, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </Card>

        </div>

    );

}

export default Analytics;