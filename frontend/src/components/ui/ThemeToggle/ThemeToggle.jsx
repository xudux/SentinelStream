import { useTheme } from "../../../context/ThemeContext";

import Button from "../Button/Button";

import "./ThemeToggle.css";

function ThemeToggle() {

    const {
        theme,
        setTheme
    } = useTheme();

    return (

        <div className="theme-toggle">

            <Button
                variant={theme === "light" ? "primary" : "secondary"}
                onClick={() => setTheme("light")}
            >
                ☀️
            </Button>

            <Button
                variant={theme === "dark" ? "primary" : "secondary"}
                onClick={() => setTheme("dark")}
            >
                🌙
            </Button>

            <Button
                variant={theme === "system" ? "primary" : "secondary"}
                onClick={() => setTheme("system")}
            >
                💻
            </Button>

        </div>

    );

}

export default ThemeToggle;