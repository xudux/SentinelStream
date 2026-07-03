import { useState } from "react";

import API from "../../api/api";
import Navbar from "../../components/common/Navbar";

import {
    PageHeader,
    Card,
    Button,
    Badge,
    ErrorState,
    Input,
    Progress
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
                actions={
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setAmount("");
                            setMerchant("");
                            setLocation("");
                            setResult(null);
                            setError("");
                        }}
                    >
                        Clear
                    </Button>
                }
            />

            <Card
                title="Create Transaction"
                subtitle="Initiate a new transaction for processing"
            >

                <form
                    className="customer-transaction-form"
                    onSubmit={submitTransaction}
                >

                    <Input
                        label="Amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />

                    <Input
                        label="Merchant"
                        placeholder="Merchant name"
                        value={merchant}
                        onChange={(e) => setMerchant(e.target.value)}
                        required
                    />

                    <Input
                        label="Location"
                        placeholder="Transaction location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Send Transaction
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

                <Card
                    title="Fraud Analysis Result"
                    subtitle="Evaluation returned by the fraud engine"
                >

                    <div className="preview-item">
                        <span>Status</span>

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
                    </div>

                    {result.transaction_id && (

                        <div className="preview-item">
                            <span>Transaction ID</span>
                            <strong>{result.transaction_id}</strong>
                        </div>

                    )}

                    {result.risk_score !== undefined && (

                        <div className="preview-item">
                            <span>Risk Score</span>

                            <div style={{ maxWidth: 240 }}>

                                <Progress
                                    value={result.risk_score}
                                    color={
                                        result.risk_score >= 80
                                            ? "danger"
                                            : result.risk_score >= 50
                                            ? "warning"
                                            : "success"
                                    }
                                />

                                <small>
                                    {result.risk_score}%
                                </small>

                            </div>
                        </div>

                    )}

                    {result.ml_prediction !== undefined && (

                        <div className="preview-item">
                            <span>ML Prediction</span>

                            <Badge
                                variant={
                                    result.ml_prediction === 1
                                        ? "danger"
                                        : "success"
                                }
                            >
                                {result.ml_prediction === 1
                                    ? "Fraud"
                                    : "Safe"}
                            </Badge>
                        </div>

                    )}

                    {result.remaining_balance !== undefined && (

                        <div className="preview-item">
                            <span>Remaining Balance</span>

                            <strong>
                                ₹ {Number(result.remaining_balance).toLocaleString()}
                            </strong>
                        </div>

                    )}

                </Card>

            )}

        </div>

    );

}

export default Transactions;