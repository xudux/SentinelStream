function Button({
    children,
    variant = "primary",
    type = "button",
    ...props
}) {
    return (
        <button
            type={type}
            className={`ui-btn ui-btn-${variant}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;