function Input({

    label,

    error,

    helperText,

    required = false,

    className = "",

    ...props

}) {

    return (

        <div className="ui-form-group">

            {label && (

                <label className="ui-label">

                    {label}

                    {required && (

                        <span className="ui-required">

                            *

                        </span>

                    )}

                </label>

            )}

            <input

                className={`ui-input ${className}`}

                {...props}

            />

            {error ? (

                <div className="ui-error">

                    {error}

                </div>

            ) : helperText ? (

                <div className="ui-helper">

                    {helperText}

                </div>

            ) : null}

        </div>

    );

}

export default Input;