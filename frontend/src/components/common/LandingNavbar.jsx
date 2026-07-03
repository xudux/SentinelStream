import { Link } from "react-router-dom";

import ThemeToggle from "../ui/ThemeToggle/ThemeToggle";
import { Button } from "../ui";

function LandingNavbar() {

    return (

        <header className="landing-navbar">

            <div className="landing-navbar-logo">

                SentinelStream

            </div>

            <nav className="landing-navbar-links">

                <a href="#features">
                    Features
                </a>

                <a href="#architecture">
                    Architecture
                </a>

                <a href="#technology">
                    Technology
                </a>

                <a href="#preview">
                    Dashboards
                </a>

            </nav>

            <div className="landing-navbar-actions">

                <ThemeToggle />

                <Link to="/login">
                    <Button>
                        Login
                    </Button>
                </Link>

            </div>

        </header>

    );

}

export default LandingNavbar;