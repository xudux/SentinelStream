import "./Card.css";

export default function Card({
    children,
    className = "",
    hover = false,
    padding = "md"
}) {
    return (
        <div
            className={`
                ui-card
                ui-card--${padding}
                ${hover ? "ui-card--hover" : ""}
                ${className}
            `}
        >
            {children}
        </div>
    );
}