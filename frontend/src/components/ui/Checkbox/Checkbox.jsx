function Checkbox({

    label,

    helperText,

    error,

    className = "",

    ...props

}) {

    return (

        <div className="ui-form-group">

            <label className={`ui-checkbox ${className}`}>

                <input

                    type="checkbox"

                    {...props}

                />

                <span className="ui-checkbox-box"></span>

                {label && (

                    <span className="ui-checkbox-label">

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

export default Checkbox;