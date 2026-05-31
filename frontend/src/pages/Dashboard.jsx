import { useEffect, useState } from "react"
import api from "../api/api"

import StatsCard from "../components/StatsCard"
import FraudTable from "../components/FraudTable"

function Dashboard() {

    const [stats,setStats] = useState({})
    const [recent,setRecent] = useState([])
    const [highRisk,setHighRisk] = useState([])

    useEffect(() => {

        api.get(
            "/dashboard/stats"
        )
        .then(
            res => setStats(res.data)
        )

        api.get(
            "/dashboard/recent"
        )
        .then(
            res => setRecent(res.data)
        )

        api.get(
            "/dashboard/high-risk"
        )
        .then(
            res => setHighRisk(res.data)
        )

    },[])

    return (

        <div className="container">

            <h1>
                🛡️ SentinelStream Fraud Monitoring Dashboard
            </h1>

            <div className="cards">

                <StatsCard

                    title="Transactions"

                    value={
                        stats.total_transactions
                    }

                />

                <StatsCard

                    title="Fraud Events"

                    value={
                        stats.fraud_events
                    }

                />
                <StatsCard

                    title="Fraud Rate"

                    value={`${stats.fraud_rate}%`}
                    
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