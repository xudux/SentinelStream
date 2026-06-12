import { Link } from "react-router-dom"

function Navbar() {

    return (

        <div className="navbar">

            <Link to="/dashboard">
                Dashboard
            </Link>

            <Link to="/transactions">
                Simulator
            </Link>

            <Link to="/monitor">
                Monitoring
            </Link>

            <Link to="/audit-logs">
                Audit Logs
            </Link>

            <Link to="/fraud-events">
                Fraud Events
            </Link>

            <Link to="/users">
                Users
            </Link>

            <Link to="/analytics">
                Analytics
            </Link>

        </div>

    )

}

export default Navbar