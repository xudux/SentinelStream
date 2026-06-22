import { useEffect, useState } from "react"
import API from "../../api/api"
import Navbar from "../../components/common/Navbar"

function AuditLogs() {

    const [logs, setLogs] = useState([])

    useEffect(() => {

        API.get("/admin/audit-logs")
            .then(res => setLogs(res.data))
            .catch(console.error)

    }, [])

    return (

        <div className="container">

            <Navbar />

            <h1>
                Audit Logs
            </h1>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>User ID</th>
                        <th>Action</th>
                        <th>Details</th>
                        <th>Created At</th>

                    </tr>

                </thead>

                <tbody>

                    {logs.map(log => (

                        <tr key={log.id}>

                            <td>{log.id}</td>

                            <td>{log.user_id}</td>

                            <td>{log.action}</td>

                            <td>{log.details}</td>

                            <td>{log.created_at}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default AuditLogs