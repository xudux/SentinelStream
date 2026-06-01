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

        </div>

    )

}

export default Navbar