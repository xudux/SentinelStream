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

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Risk Score</th>
                    </tr>

                </thead>

                <tbody>

                    {transactions.map(tx => (

                        <tr key={tx.id}>

                            <td>
                                <Link to={`/transactions/${tx.id}`}>
                                    {tx.id}
                                </Link>
                            </td>

                            <td>{tx.amount}</td>
                            <td>{tx.status}</td>
                            <td>{tx.risk_score}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default TransactionMonitor