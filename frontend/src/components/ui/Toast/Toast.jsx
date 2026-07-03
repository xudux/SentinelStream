import "./Toast.css";

function Toast({

    type = "success",

    title,

    message,

    onClose

}) {

    return (

        <div className={`ui-toast ui-toast-${type}`}>

            <div className="ui-toast-content">

                {title && (

                    <strong>

                        {title}

                    </strong>

                )}

                <span>

                    {message}

                </span>

            </div>

            <button

                className="ui-toast-close"

                onClick={onClose}

            >

                ✕

            </button>

        </div>

    );

}

export default Toast;