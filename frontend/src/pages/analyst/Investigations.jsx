import { useEffect, useState } from "react";

import API from "../../api/api";

import Navbar from "../../components/common/Navbar";
import { Link } from "react-router-dom";

import {
    PageHeader,
    Card,
    Badge,
    EmptyState,
    ErrorState,
    CardSkeleton
} from "../../components/ui";

function Investigations() {

    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCases = () => {

        setLoading(true);
        setError("");

        API.get("/investigations/")
            .then(res => {

                setCases(
                    [...res.data].sort(
                        (a, b) => b.id - a.id
                    )
                );

            })
            .catch(() => {

                setError("Unable to load investigations.");

            })
            .finally(() => {

                setLoading(false);

            });

    };

    useEffect(() => {

        fetchCases();

    }, []);

    if (loading) {

        return (

            <div className="container">

                <Navbar />

                <PageHeader
                    title="Fraud Investigation Cases"
                    subtitle="Review and manage fraud investigations"
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
                    title="Investigations unavailable"
                    description={error}
                    onRetry={fetchCases}
                />

            </div>

        );

    }

    return (

        <div className="container">

            <Navbar />

            <PageHeader
                title="Fraud Investigation Cases"
                subtitle="Review and manage fraud investigations"
            />

            <Card
                title="Investigations"
                subtitle="Cases assigned for fraud analysis and resolution"
            >

                <table className="ui-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Fraud Event</th>

                            <th>Status</th>

                            <th>Assigned To</th>

                            <th>Priority</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            cases.length === 0 ? (

                                <tr>

                                    <td colSpan="5">

                                        <EmptyState
                                            title="No investigations"
                                            description="No fraud investigations are currently available."
                                        />

                                    </td>

                                </tr>

                            ) : (

                                cases.map(c => (

                                    <tr key={c.id}>

                                        <td>

                                            <Link to={`/analyst/investigations/${c.id}`}>

                                                <Badge variant="primary">

                                                    View #{c.id}

                                                </Badge>

                                            </Link>

                                        </td>

                                        <td>

                                            {c.fraud_event_id}

                                        </td>

                                        <td>

                                            <Badge
                                                variant={
                                                    c.status === "OPEN"
                                                        ? "warning"
                                                        : c.status === "CLOSED"
                                                        ? "success"
                                                        : "primary"
                                                }
                                            >
                                                {c.status}
                                            </Badge>

                                        </td>

                                        <td>

                                            {c.assigned_to}

                                        </td>

                                        <td>

                                            <Badge
                                                variant={
                                                    c.priority === "HIGH"
                                                        ? "danger"
                                                        : c.priority === "MEDIUM"
                                                        ? "warning"
                                                        : "success"
                                                }
                                            >
                                                {c.priority}
                                            </Badge>

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

export default Investigations;