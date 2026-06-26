import { useEffect, useState } from "react"

import API from "../../api/api"

import Navbar from "../../components/common/Navbar"
import { PageHeader } from "../../components/ui";



function Dashboard() {

    const [stats, setStats] = useState({})

    const [users, setUsers] = useState([])

    const [auditLogs, setAuditLogs] = useState([])

    const resetBalances = () => {

        if (
            !window.confirm(
                "Reset all user balances?"
            )
        ) {
            return
        }

        API.post(
            "/admin/reset-balances"
        )

        .then(res => {

            alert(
                `Updated ${res.data.users_updated} users`
            )

        })

        .catch(console.error)

    }


    useEffect(() => {

        API.get("/dashboard/stats")

        .then(res => {

            setStats(res.data)

        })

        .catch(console.error)



        API.get("/users/all")

        .then(res => {

            setUsers(res.data)

        })

        .catch(console.error)



        API.get("/admin/audit-logs")

        .then(res => {

            setAuditLogs(

                res.data.slice(0,5)

            )

        })

        .catch(console.error)


    }, [])



    return (

        <div className="admin-dashboard theme-admin">

            <Navbar />


            <PageHeader

                title="SentinelStream Admin Console"

                subtitle="Platform administration and system overview"

            />



            <div className="admin-cards-grid">


                <div className="admin-stat-card">

                    <div className="admin-stat-title">

                    Total Users

                    </div>

                    <div className="admin-stat-value">

                    {users.length}

                    </div>

                </div>



                <div className="admin-stat-card">

                    <div className="admin-stat-title">

                    Transactions

                    </div>

                    <div className="admin-stat-value">

                    {stats.total_transactions || 0}

                    </div>

                </div>



                <div className="admin-stat-card">

                    <div className="admin-stat-title">

                    Fraud Events

                    </div>

                    <div className="admin-stat-value">

                    {stats.fraud_events || 0}

                    </div>

                </div>



                <div className="admin-stat-card">

                    <div className="admin-stat-title">

                    Investigations

                    </div>

                    <div className="admin-stat-value">

                    {stats.blocked || 0}

                    </div>

                </div>



                <div className="admin-stat-card">

                    <div className="admin-stat-title">

                    Fraud Rate

                    </div>

                    <div className="admin-stat-value">

                    {stats.fraud_rate || 0}%

                    </div>

                </div>

            </div>



            <div className="admin-section">

                <h2>

                Recent Audit Logs

                </h2>


                <table className="admin-table">

                    <thead>

                        <tr>

                            <th>User</th>

                            <th>Action</th>

                            <th>Details</th>

                            <th>Time</th>

                        </tr>

                    </thead>


                    <tbody>

                    {

                    auditLogs.map(log => (

                        <tr key={log.id}>


                            <td>

                            {log.user_id}

                            </td>


                            <td>

                            {log.action}

                            </td>


                            <td>

                            {log.details}

                            </td>


                            <td>

                            {

                            new Date(

                            log.created_at

                            ).toLocaleString()

                            }

                            </td>

                        </tr>

                    ))

                    }

                    </tbody>

                </table>

            </div>

            <div className="admin-section">

                <h2>
                    System Controls
                </h2>

                <div className="admin-control-card">

                    <h3>
                        Reset User Balances
                    </h3>

                    <p>
                        Restore every account balance
                        to ₹10,000.
                    </p>

                    <button
                        className="danger-btn"
                        onClick={resetBalances}
                    >
                        Reset Balances
                    </button>

                </div>

            </div>


        </div>

    )

}


export default Dashboard