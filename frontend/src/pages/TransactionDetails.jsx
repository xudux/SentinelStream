import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../api/api"
import Navbar from "../components/common/Navbar"

function TransactionDetails() {

    const { id } = useParams()

    const [transaction, setTransaction] = useState(null)

    useEffect(() => {

        API.get(`/transactions/${id}`)
            .then(res => setTransaction(res.data))

    }, [id])

    if (!transaction) {

        return <div>Loading...</div>

    }

    return (

        <div className="container">

            <Navbar />

            <h1>
                Transaction Investigation
            </h1>

            <div className="analyst-transaction-card">

                <p>
                    <strong>ID:</strong> {transaction.id}
                </p>

                <p>
                    <strong>Amount:</strong> {transaction.amount}
                </p>

                <p>
                    <strong>Merchant:</strong> {transaction.merchant}
                </p>

                <p>
                    <strong>Location:</strong> {transaction.location}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    <span
                        className={`status-badge ${transaction.status}`}
                    >
                        {transaction.status}
                    </span>
                </p>

                <p>
                    <strong>Risk Score:</strong>{" "}
                    {
                        transaction.risk_score >= 100
                        ?
                            <span className="risk-critical">
                            CRITICAL
                            </span>
                        :
                        transaction.risk_score >= 70
                        ?
                            <span className="risk-high">
                            HIGH
                            </span>
                        :
                            transaction.risk_score
                    }
                </p>

                <p>
                    <strong>User ID:</strong>
                    {transaction.user_id}
                </p>

                <p>
                    <strong>Created:</strong>
                    {transaction.created_at}
                </p>

            </div>

        </div>

    )

}

export default TransactionDetails