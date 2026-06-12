import { useEffect, useState } from "react"
import API from "../api/api"
import Navbar from "../components/Navbar"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"

function Analytics() {

    const [stats, setStats] = useState({})
    const [distribution, setDistribution] = useState({})

    useEffect(() => {

        API.get("/dashboard/stats")
            .then(res => setStats(res.data))
            .catch(console.error)

        API.get("/dashboard/status-distribution")
            .then(res => setDistribution(res.data))
            .catch(console.error)

    }, [])

    const chartData = [
        {
            name: "Approved",
            count: distribution.approved || 0
        },
        {
            name: "Flagged",
            count: distribution.flagged || 0
        },
        {
            name: "Blocked",
            count: distribution.blocked || 0
        }
    ]

    return (

        <div className="container">

            <Navbar />

            <h1>
                ML Analytics Dashboard
            </h1>

            <div className="cards">

                <div className="card">
                    <h3>Total Transactions</h3>
                    <p>{stats.total_transactions || 0}</p>
                </div>

                <div className="card">
                    <h3>Fraud Events</h3>
                    <p>{stats.fraud_events || 0}</p>
                </div>

                <div className="card">
                    <h3>Fraud Rate</h3>
                    <p>{stats.fraud_rate || 0}%</p>
                </div>

            </div>

            <h2>
                Transaction Status Distribution
            </h2>

            <ResponsiveContainer
                width="100%"
                height={400}
            >

                <BarChart data={chartData}>

                    <CartesianGrid />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="count" />

                </BarChart>

            </ResponsiveContainer>

        </div>

    )

}

export default Analytics