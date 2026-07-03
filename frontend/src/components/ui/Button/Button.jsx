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

        <button

            className={classes}

            disabled={loading || disabled}

            {...props}

        >

            {

                loading

                    ? <Spinner />

                    : (

                        <>

                            {icon}

                            {children}
                        </>

                    )

            }

        </button>

    );

}

export default Button;