import { useEffect, useState } from "react"
import API from "../../api/api";

import StatsCard from "../../components/common/StatsCard"
import FraudTable from "../../components/common/FraudTable"
import Navbar from "../../components/common/Navbar"
import PageHeader from "../../components/ui/PageHeader/PageHeader";

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

        <div className="analyst-dashboard theme-analyst">
            <Navbar />

            <PageHeader
                title="Fraud Monitoring Center"
                subtitle="Real-time fraud detection and investigation system"
            />

            {error && (
                <div className="error-box">
                    {error}
                </div>
            )}

            <div className="analyst-cards-grid">

                <StatsCard
                    title="Transactions"
                    value={stats.total_transactions || 0}
                />

                <StatsCard
                    title="Approved"
                    value={stats.approved || 0}
                />

                <StatsCard
                    title="Flagged"
                    value={stats.flagged || 0}
                />

                <StatsCard
                    title="Blocked"
                    value={stats.blocked || 0}
                />

                <StatsCard
                    title="Fraud Events"
                    value={stats.fraud_events || 0}
                />

                <StatsCard

                    title="High Risk"

                    value={highRisk.length}

                />

                <StatsCard
                    title="Fraud Rate"
                    value={`${stats.fraud_rate || 0}%`}
                />

            </div>

            <div className="analyst-section">

                <FraudTable

                    title="Recent Fraud Events"

                    data={recent}

                />

            </div>

            <div className="analyst-section">

                <FraudTable

                    title="High Risk Transactions"

                    data={highRisk}

                />

            </div>

        </div>

    )

}

export default Dashboard