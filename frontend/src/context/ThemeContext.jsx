import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(() => {

        return localStorage.getItem("theme") || "system";

    });

    useEffect(() => {

        const root = document.documentElement;

        const systemDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const activeTheme =
            theme === "system"
                ? (systemDark ? "dark" : "light")
                : theme;

        root.setAttribute("data-theme", activeTheme);

        localStorage.setItem("theme", theme);

    }, [theme]);

    return (

        <ThemeContext.Provider
            value={{
                theme,
                setTheme
            }}
        >

            {children}

        </ThemeContext.Provider>

    );

}

export function useTheme() {

    return useContext(ThemeContext);

}