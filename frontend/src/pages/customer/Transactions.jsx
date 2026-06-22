import { useState } from "react"
import API from "../../api/api";
import Navbar from "../../components/common/Navbar"

function Transactions() {

    const [amount, setAmount] = useState("")
    const [merchant, setMerchant] = useState("")
    const [location, setLocation] = useState("")

    const [result, setResult] = useState(null)

    const submitTransaction = async (e) => {

        e.preventDefault()

        try {

            const response = await API.post(
                "/transactions/send",
                {
                    amount: Number(amount),
                    merchant,
                    location
                }
            )

            setResult(response.data)

        } catch (error) {

            setResult(
                error.response?.data || {
                    detail: "Server Error"
                }
            )

        }

    }

    return (

        <div className="customer-transactions">

            <Navbar/>

            <h1>
                Transaction Simulator
            </h1>

            <form
                className="customer-transaction-form"
                onSubmit={submitTransaction}
            >

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Merchant"
                    value={merchant}
                    onChange={(e) =>
                        setMerchant(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                />

                <button type="submit">
                    Send Transaction
                </button>

            </form>

            {result && (
                <div className="customer-result-box">
                    <h3>
                    Result
                    </h3>

                    <p>
                    <b>Status:</b>
                    {result.status || result.detail}
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
                        <b>Risk Score:</b>
                        {result.risk_score}
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
                    result.remaining_balance &&
                    <p>
                        <b>Remaining Balance:</b>
                        ₹ {result.remaining_balance}
                    </p>
                    }
                </div>
            )}

        </div>

    )

}

export default Transactions