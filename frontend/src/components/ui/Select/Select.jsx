function Select({

    label,

    error,

    helperText,

    required = false,

    className = "",

    children,

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

            <select

                className={`ui-select ${className}`}

                {...props}

            >

                {children}

            </select>

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

export default Select;