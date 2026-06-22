import { useEffect, useState } from "react"
import API from "../../api/api"
import Navbar from "../../components/common/Navbar"

function FraudEvents() {

    const [events, setEvents] = useState([])

    useEffect(() => {

        API.get("/dashboard/fraud-events")
            .then(res => setEvents(res.data))
            .catch(console.error)

    }, [])

    return (

        <div className="container">

            <Navbar />

            <div className="analyst-header">
                <div>
                    <h1>
                    Fraud Event Queue
                    </h1>
                    <p>
                    High risk transactions awaiting analyst investigation
                    </p>
                </div>
            </div>

            <table className="analyst-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Transaction ID</th>
                        <th>Risk Score</th>
                        <th>Created At</th>

                    </tr>

                </thead>

                <tbody>

                    {events.map(event => (

                        <tr key={event.id}>

                            <td>{event.id}</td>

                            <td>{event.transaction_id}</td>

                            <td>
                                {
                                    event.risk_score >= 100
                                    ?
                                        <span className="risk-critical">
                                        CRITICAL
                                        </span>
                                    :
                                    event.risk_score >= 70
                                    ?
                                        <span className="risk-high">
                                        HIGH
                                        </span>
                                    :
                                        event.risk_score
                                }
                            </td>

                            <td>
                            {
                                new Date(
                                event.created_at
                                )
                                .toLocaleString()
                            }
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default FraudEvents