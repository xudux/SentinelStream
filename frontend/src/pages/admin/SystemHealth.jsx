import { useEffect, useState } from "react"
import API from "../../api/api"
import Navbar from "../../components/common/Navbar"

function SystemHealth() {

    const [health, setHealth] = useState(null)

    useEffect(() => {

        API.get("/admin/system-health")
            .then(res => setHealth(res.data))
            .catch(console.error)

    }, [])

    if (!health) {

        return <div>Loading...</div>

    }

    return (

        <div className="container">

            <Navbar />

            <div className="admin-header">

                <h1>
                    System Health Monitor
                </h1>

                <p>
                    Real-time platform monitoring and service status
                </p>

            </div>

            <div className="admin-cards-grid">

                <div className="admin-stat-card">

                    <div className="admin-stat-title">
                        Users
                    </div>

                    <div className="admin-stat-value">
                        {health.total_users}
                    </div>

                </div>

                <div className="admin-stat-card">

                    <div className="admin-stat-title">
                        Transactions
                    </div>

                    <div className="admin-stat-value">
                        {health.total_transactions}
                    </div>

                </div>

                <div className="admin-stat-card">

                    <div className="admin-stat-title">
                        Fraud Events
                    </div>

                    <div className="admin-stat-value">
                        {health.fraud_events}
                    </div>

                </div>

                <div className="admin-stat-card">

                    <div className="admin-stat-title">
                        Active Rules
                    </div>

                    <div className="admin-stat-value">
                        {health.active_rules}
                    </div>

                </div>

            </div>

            <div className="admin-section">

                <h2>
                    Service Status
                </h2>

                <table className="admin-table">

                    <thead>

                        <tr>
                            <th>Service</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>API Gateway</td>

                            <td>
                                <span className="health-online">
                                    {health.api_status}
                                </span>
                            </td>

                        </tr>

                        <tr>

                            <td>Database</td>

                            <td>
                                <span className="health-online">
                                    {health.database_status}
                                </span>
                            </td>

                        </tr>

                        <tr>

                            <td>Fraud Engine</td>

                            <td>
                                <span className="health-online">
                                    {health.fraud_engine}
                                </span>
                            </td>

                        </tr>

                        <tr>

                            <td>Authentication</td>

                            <td>
                                <span className="health-online">
                                    {health.auth_service}
                                </span>
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            <div className="admin-section">

                <h2>
                    Latest Activity
                </h2>

                <div className="admin-control-card">

                    <h3>
                        Most Recent Audit Event
                    </h3>

                    <p>
                        {health.latest_activity}
                    </p>

                </div>

            </div>

        </div>

    )

}

export default SystemHealth