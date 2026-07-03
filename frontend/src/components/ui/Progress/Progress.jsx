import "./Progress.css";

function Progress({

    value = 0,

    label,

    color = "primary",

    showValue = true

}) {

    const percentage = Math.max(0, Math.min(value, 100));

    return (

        <div className="ui-progress">

            {

                (label || showValue) && (

                    <div className="ui-progress-header">

                        {

                            label && (

                                <span>

                                    {label}

                                </span>

                            )

                        }

                        {

                            showValue && (

                                <strong>

                                    {percentage}%

                                </strong>

                            )

                        }

                    </div>

                )

            }

            <div className="ui-progress-track">

                <div

                    className={`ui-progress-fill ui-progress-${color}`}

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

        </div>

    );

}

export default Progress;