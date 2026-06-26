import { useEffect, useState } from "react"
import API from "../../api/api"
import Navbar from "../../components/common/Navbar"

function AuditLogs() {

    const [logs, setLogs] = useState([])

    const [actionFilter, setActionFilter] = useState("ALL")

    const [searchTerm, setSearchTerm] = useState("")

    const [roleFilter, setRoleFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {

        API.get("/admin/audit-logs")
            .then(res => setLogs(res.data))
            .catch(console.error)

    }, [])

    const filteredLogs = logs.filter(log => {

        const actionMatch =
            actionFilter === "ALL"
                ? true
                : log.action === actionFilter

        const searchMatch =
            log.details
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())

        return actionMatch && searchMatch

    })

    const loginCount = logs.filter(
        l => l.action === "USER_LOGIN"
    ).length

    const transactionCount = logs.filter(
        l =>
            l.action === "TRANSACTION_PROCESSED" ||
            l.action === "TRANSACTION_BLOCKED"
    ).length

    const fraudCount = logs.filter(
        l => l.action === "FRAUD_EVENT_CREATED"
    ).length

    return (

        <div className="container">

            <Navbar />

            <div className="analyst-header">

                <h1>
                    Audit Log Center
                </h1>

                <p>
                    Administrative activity monitoring
                </p>

            </div>

            <div className="analyst-cards-grid">

                <div className="analyst-stat-card">
                    <div className="analyst-stat-title">
                        Total Logs
                    </div>
                    <div className="analyst-stat-value">
                        {logs.length}
                    </div>
                </div>

                <div className="analyst-stat-card">
                    <div className="analyst-stat-title">
                        Login Events
                    </div>
                    <div className="analyst-stat-value">
                        {loginCount}
                    </div>
                </div>

                <div className="analyst-stat-card">
                    <div className="analyst-stat-title">
                        Transaction Events
                    </div>
                    <div className="analyst-stat-value">
                        {transactionCount}
                    </div>
                </div>

                <div className="analyst-stat-card">
                    <div className="analyst-stat-title">
                        Fraud Events
                    </div>
                    <div className="analyst-stat-value">
                        {fraudCount}
                    </div>
                </div>

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "25px"
                }}
            >

                <select
                    value={actionFilter}
                    onChange={(e) =>
                        setActionFilter(e.target.value)
                    }
                >

                    <option value="ALL">
                        All Actions
                    </option>

                    <option value="USER_LOGIN">
                        USER_LOGIN
                    </option>

                    <option value="TRANSACTION_PROCESSED">
                        TRANSACTION_PROCESSED
                    </option>

                    <option value="TRANSACTION_BLOCKED">
                        TRANSACTION_BLOCKED
                    </option>

                    <option value="FRAUD_EVENT_CREATED">
                        FRAUD_EVENT_CREATED
                    </option>

                </select>

                <input
                    type="text"
                    placeholder="Search details..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />

            </div>

            <table className="analyst-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>User</th>
                        <th>Action</th>
                        <th>Details</th>
                        <th>Time</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredLogs.map(log => (

                        <tr key={log.id}>

                            <td>{log.id}</td>

                            <td>{log.user_id}</td>

                            <td>

                                <span
                                    className={`audit-badge ${log.action}`}
                                >
                                    {log.action}
                                </span>

                            </td>

                            <td>{log.details}</td>

                            <td>
                                {
                                    new Date(
                                        log.created_at
                                    ).toLocaleString()
                                }
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default AuditLogs