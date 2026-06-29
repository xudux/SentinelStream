import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../api/api";
import Navbar from "../components/common/Navbar";

import {
    PageHeader,
    Card,
    Badge,
    ErrorState,
    PageSkeleton
} from "../components/ui";

function TransactionDetails() {

    const { id } = useParams();

    const [transaction, setTransaction] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTransaction = () => {

        setLoading(true);
        setError("");

        API.get(`/transactions/${id}`)
            .then(res => {

                setTransaction(res.data);

            })
            .catch(() => {

                setError("Unable to load transaction.");

            })
            .finally(() => {

                setLoading(false);

            });

    };

    useEffect(() => {

        fetchTransaction();

    }, [id]);

    if (loading) {

        return (

            <div className="container">

                <Navbar />

                <PageSkeleton />

            </div>

        );

    }

    if (error) {

        return (

            <div className="container">

                <Navbar />

                <ErrorState
                    title="Transaction unavailable"
                    description={error}
                    onRetry={fetchTransaction}
                />

            </div>

        );

    }

    if (!transaction) {

        return (

            <div className="container">

                <Navbar />

                <ErrorState
                    title="Transaction not found"
                    description="The requested transaction does not exist."
                />

            </div>

        );

    }

    return (

        <div className="container">

            <Navbar />

            <PageHeader
                title={`Transaction #${transaction.id}`}
                subtitle="Detailed transaction information"
            />

            <Card title="Transaction Details">

                <p>
                    <strong>ID:</strong> {transaction.id}
                </p>

                <p>
                    <strong>Amount:</strong> ₹ {Number(transaction.amount).toLocaleString()}
                </p>

                <p>
                    <strong>Merchant:</strong> {transaction.merchant}
                </p>

                <p>
                    <strong>Location:</strong> {transaction.location}
                </p>

                <p>

                    <strong>Status:</strong>{" "}

                    <Badge
                        variant={
                            transaction.status === "BLOCKED"
                                ? "danger"
                                : transaction.status === "FLAGGED"
                                ? "warning"
                                : "success"
                        }
                    >
                        {transaction.status}
                    </Badge>

                </p>

                <p>

                    <strong>Risk Score:</strong>{" "}

                    <Badge
                        variant={
                            transaction.risk_score >= 80
                                ? "danger"
                                : transaction.risk_score >= 50
                                ? "warning"
                                : "success"
                        }
                    >
                        {transaction.risk_score}
                    </Badge>

                </p>

                <p>
                    <strong>User ID:</strong>{" "}
                    {transaction.user_id}
                </p>

                <p>
                    <strong>Created:</strong>{" "}
                    {new Date(transaction.created_at).toLocaleString()}
                </p>

            </Card>

        </div>

    );

}

export default TransactionDetails;