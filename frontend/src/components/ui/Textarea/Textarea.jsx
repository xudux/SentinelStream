function Textarea({

    label,

    error,

    helperText,

    required = false,

    className = "",

    rows = 5,

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

            <textarea

                rows={rows}

                className={`ui-textarea ${className}`}

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

export default Textarea;