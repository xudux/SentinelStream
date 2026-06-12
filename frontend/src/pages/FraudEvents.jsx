import { useEffect, useState } from "react"
import API from "../api/api"
import Navbar from "../components/Navbar"

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

            <h1>
                Fraud Events Queue
            </h1>

            <table>

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

                            <td>{event.risk_score}</td>

                            <td>{event.created_at}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default FraudEvents