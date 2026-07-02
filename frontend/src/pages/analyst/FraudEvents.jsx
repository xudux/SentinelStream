import { useEffect, useState } from "react";

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

function FraudEvents() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchEvents = () => {

        setLoading(true);
        setError("");

        API.get("/dashboard/fraud-events")

            .then(res => {

                setEvents(
                    [...res.data].sort(
                        (a, b) => b.id - a.id
                    )
                );

            })

            .catch(() => {

                setError("Unable to load fraud events.");

            })

            .finally(() => {

                setLoading(false);

            });

    };

    useEffect(() => {

        fetchEvents();

    }, []);

    if (loading) {

        return (

            <div className="container">

                <Navbar />

                <PageHeader
                    title="Fraud Event Queue"
                    subtitle="High risk transactions awaiting analyst investigation"
                />

                <CardSkeleton />

            </div>

        );

    }

    if (error) {

        return (

            <div className="container">

                <Navbar />

                <ErrorState
                    title="Fraud events unavailable"
                    description={error}
                    onRetry={fetchEvents}
                />

            </div>

        );

    }

    return (

        <div className="container">

            <Navbar />

            <PageHeader
                title="Fraud Event Queue"
                subtitle="High risk transactions awaiting analyst investigation"
            />

            <Card
                title="Fraud Events"
                subtitle="Detected fraud events awaiting investigation"
            >

                <table className="ui-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Transaction ID</th>
                            <th>Risk Score</th>
                            <th>Created At</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            events.length === 0 ? (

                                <tr>

                                    <td colSpan="4">

                                        <EmptyState
                                            title="No fraud events"
                                            description="There are currently no fraud events awaiting review."
                                        />

                                    </td>

                                </tr>

                            ) : (

                                events.map(event => (

                                    <tr key={event.id}>

                                        <td>{event.id}</td>

                                        <td>{event.transaction_id}</td>

                                        <td>

                                            <Badge
                                                variant={
                                                    event.risk_score >= 100
                                                        ? "danger"
                                                        : event.risk_score >= 70
                                                        ? "warning"
                                                        : "success"
                                                }
                                            >

                                                {
                                                    event.risk_score >= 100
                                                        ? "CRITICAL"
                                                        : event.risk_score >= 70
                                                        ? "HIGH"
                                                        : event.risk_score
                                                }

                                            </Badge>

                                        </td>

                                        <td>

                                            {
                                                new Date(
                                                    event.created_at
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

        </div>

    );

}

export default FraudEvents;