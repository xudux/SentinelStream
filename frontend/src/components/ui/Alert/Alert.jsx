import "./Alert.css";

function Alert({
    variant = "info",
    title,
    children,
    className = ""
}) {

    return (

        <div className={`ui-alert ui-alert-${variant} ${className}`}>

            <div className="ui-alert-icon">

                {variant === "success" && "✓"}

                {variant === "danger" && "✕"}

                {variant === "warning" && "⚠"}

                {variant === "info" && "ℹ"}

            </div>

            <div className="ui-alert-content">

                {title && (
                    <h4 className="ui-alert-title">
                        {title}
                    </h4>
                )}

                <div className="ui-alert-message">
                    {children}
                </div>

            </div>

        </div>

    );

}

export default Alert;