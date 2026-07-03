function Switch({

    label,

    helperText,

    error,

    className = "",

    ...props

}) {

    return (

        <div className="ui-form-group">

            <label className={`ui-switch ${className}`}>

                <input

                    type="checkbox"

                    {...props}

                />

                <span className="ui-switch-slider"></span>

                {label && (

                    <span className="ui-switch-label">

                        {label}

                    </span>

                )}

            </label>

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

export default Switch;