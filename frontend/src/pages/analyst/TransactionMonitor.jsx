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

function TransactionMonitor() {

    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchTransactions = () => {

        setLoading(true);
        setError("");

        API.get("/transactions/all")
            .then(res => {

                setTransactions(
                    [...res.data].sort(
                        (a, b) => b.id - a.id
                    )
                );

            })
            .catch(() => {

                setError("Unable to load transactions.");

            })
            .finally(() => {

                setLoading(false);

            });

    };

    useEffect(() => {

        fetchTransactions();

    }, []);

    if (loading) {

        return (

            <div className="container">

                <Navbar />

                <PageHeader
                    title="Transaction Monitoring Console"
                    subtitle="Monitor all platform transactions"
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
                    title="Transactions unavailable"
                    description={error}
                    onRetry={fetchTransactions}
                />

            </div>

        );

    }

    return (

        <div className="container">

            <Navbar />

            <PageHeader
                title="Transaction Monitoring Console"
                subtitle="Monitor all platform transactions"
            />

            <Card
                title="Transactions"
                subtitle="Monitor processed transactions and risk status"
            >

                <table className="ui-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>User</th>

                            <th>Amount</th>

                            <th>Merchant</th>

                            <th>Location</th>

                            <th>Status</th>

                            <th>Risk</th>

                            <th>Details</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            transactions.length === 0 ? (

                                <tr>

                                    <td colSpan="8">

                                        <EmptyState
                                            title="No transactions"
                                            description="No transactions have been processed."
                                        />

                                    </td>

                                </tr>

                            ) : (

                                transactions.map(tx => (

                                    <tr key={tx.id}>

                                        <td>{tx.id}</td>

                                        <td>{tx.user_id}</td>

                                        <td>
                                            ₹
                                            {
                                                tx.amount.toLocaleString()
                                            }
                                        </td>

                                        <td>{tx.merchant}</td>

                                        <td>{tx.location}</td>

                                        <td>

                                            <Badge
                                                variant={
                                                    tx.status === "BLOCKED"
                                                        ? "danger"
                                                        : tx.status === "FLAGGED"
                                                        ? "warning"
                                                        : "success"
                                                }
                                            >
                                                {tx.status}
                                            </Badge>

                                        </td>

                                        <td>

                                            <Badge
                                                variant={
                                                    tx.risk_score >= 80
                                                        ? "danger"
                                                        : tx.risk_score >= 50
                                                        ? "warning"
                                                        : "success"
                                                }
                                            >

                                                {tx.risk_score}

                                            </Badge>

                                        </td>

                                        <td>

                                            <Link to={`/analyst/transactions/${tx.id}`}>

                                                <Badge variant="primary">

                                                    View

                                                </Badge>

                                            </Link>

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

export default TransactionMonitor;