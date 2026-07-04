import { Spinner } from "..";

function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    icon,
    className = "",
    as: Component = "button",
    ...props
}) {

    const classes = [
        "ui-button",
        `ui-button-${variant}`,
        `ui-button-${size}`,
        fullWidth && "ui-button-full",
        loading && "ui-button-loading",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Component
            className={classes}
            disabled={Component === "button" ? (loading || disabled) : undefined}
            {...props}
        >
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {icon}
                    {children}
                </>
            )}
        </Component>
    );
}

export default Button;