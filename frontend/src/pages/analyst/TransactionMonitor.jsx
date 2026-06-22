import { useEffect, useState } from "react"
import API from "../../api/api"
import Navbar from "../../components/common/Navbar"
import { Link } from "react-router-dom"

function TransactionMonitor() {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {

        API.get("/transactions/all")
            .then(res => setTransactions(res.data))
            .catch(console.error)

    }, [])

    return (

        <div className="container">

            <Navbar />

            <h1>
                Transaction Monitoring Console
            </h1>

            <table className="analyst-table">

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
                    {transactions.map(tx => (
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
                            <span className={`status-badge ${tx.status}`}>
                            {tx.status}
                            </span>
                        </td>

                        <td>{tx.risk_score}</td>

                        <td>
                            <Link to={`/analyst/transactions/${tx.id}`}>
                            View
                            </Link>
                        </td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </div>

    )

}

export default TransactionMonitor