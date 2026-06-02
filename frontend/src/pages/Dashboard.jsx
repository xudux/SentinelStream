import { useEffect, useState } from "react"
import API from "../api/api";

import StatsCard from "../components/StatsCard"
import FraudTable from "../components/FraudTable"
import Navbar from "../components/Navbar"

function Dashboard() {

    const [stats,setStats] = useState({})
    const [recent,setRecent] = useState([])
    const [highRisk,setHighRisk] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {

        API.get("/dashboard/stats")
            .then(res => setStats(res.data))
            .catch(err => {
                console.error(err)
                setError("Dashboard data failed to load")
            })

            API.get("/dashboard/recent")
            .then(res => setRecent(res.data))
            .catch(err => {
                console.error(err)
                setError("Dashboard data failed to load")
            })

            API.get("/dashboard/high-risk")
            .then(res => setHighRisk(res.data))
            .catch(err => {
                console.error(err)
                setError("Dashboard data failed to load")
            })

    },[])

    return (

        <div className="container">

            <Navbar />

            <h1>
                🛡️ SentinelStream Fraud Monitoring Dashboard
            </h1>

            {error && (
                <div className="error-box">
                    {error}
                </div>
            )}

            <div className="cards">

                <StatsCard

                    title="Transactions"

                    value={stats.total_transactions || 0}

                />

                <StatsCard

                    title="Fraud Events"

                    value={stats.fraud_events || 0}

                />
                <StatsCard

                    title="Fraud Rate"

                    value={`${stats.fraud_rate || 0}%`}
                    
                />

            </div>

            <FraudTable

                title="Recent Events"

                data={recent}

            />

            <FraudTable

                title="High Risk Events"

                data={highRisk}

            />

        </div>

    )

}

export default Dashboard