import { Spinner } from "..";

function Button({

    children,

    loading = false,

    disabled,

    ...props

}) {

    return (

        <button

            disabled={loading || disabled}

            {...props}

        >

            {

                loading

                    ? <Spinner />

                    : children

            }

        </button>

    );

}

export default Button;