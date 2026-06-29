import { useState } from "react";

import API from "../../api/api";
import Navbar from "../../components/common/Navbar";

import {
    PageHeader,
    Card,
    Button,
    Badge,
    ErrorState
} from "../../components/ui";

function Transactions() {

    const [amount, setAmount] = useState("");
    const [merchant, setMerchant] = useState("");
    const [location, setLocation] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const submitTransaction = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setResult(null);

        try {

            const response = await API.post(
                "/transactions/send",
                {
                    amount: Number(amount),
                    merchant,
                    location
                }
            );

            setResult(response.data);

        } catch (error) {

            setError(
                error.response?.data?.detail ||
                "Unable to process transaction."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="customer-transactions">

            <Navbar />

            <PageHeader
                title="Transaction Simulator"
                subtitle="Test transactions through the fraud detection engine"
            />

            <Card title="Create Transaction">

                <form
                    className="customer-transaction-form"
                    onSubmit={submitTransaction}
                >

                    <div className="form-group">

                        <label>Amount</label>

                        <input
                            className="ui-input"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Merchant</label>

                        <input
                            className="ui-input"
                            placeholder="Merchant name"
                            value={merchant}
                            onChange={(e) => setMerchant(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Location</label>

                        <input
                            className="ui-input"
                            placeholder="Transaction location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Processing..."
                            : "Send Transaction"}

                    </Button>

                </form>

            </Card>

            {error && (

                <ErrorState
                    title="Transaction Failed"
                    description={error}
                />

            )}

            {result && (

                <Card title="Transaction Result">

                    <h3>
                        Result
                    </h3>

                    <p>

                        <strong>Status:</strong>{" "}

                        <Badge
                            variant={
                                result.status === "BLOCKED"
                                    ? "danger"
                                    : result.status === "FLAGGED"
                                    ? "warning"
                                    : "success"
                            }
                        >

                            {result.status}

                        </Badge>

                    </p>

                    {
                        result.transaction_id &&
                        <p>

                            <b>Transaction ID:</b>

                            {result.transaction_id}

                        </p>
                    }

                    {
                        result.risk_score !== undefined &&
                        <p>

                            <strong>Risk Score:</strong>{" "}

                            <Badge
                                variant={
                                    result.risk_score >= 80
                                        ? "danger"
                                        : result.risk_score >= 50
                                            ? "warning"
                                            : "success"
                                }
                            >

                                {result.risk_score}

                            </Badge>

                        </p>
                    }

                    {
                        result.ml_prediction !== undefined &&
                        <p>

                            <b>ML Prediction:</b>

                            {
                                result.ml_prediction === 1
                                    ? "Fraud"
                                    : "Safe"
                            }

                        </p>
                    }

                    {
                        result.remaining_balance !== undefined &&
                        <p>

                            <b>Remaining Balance:</b>

                            ₹ {Number(result.remaining_balance).toLocaleString()}

                        </p>
                    }

                </Card>

            )}

        </div>

    );

}

export default Transactions;