function Badge({

    children,

    variant = "default",

    size = "md",

    className = ""

}) {

    return (

        <span
            className={`
                ui-badge
                ui-badge-${variant}
                ui-badge-${size}
                ${className}
            `}
        >

            {children}

        </span>

    );

}

export default Badge;