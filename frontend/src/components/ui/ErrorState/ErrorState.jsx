import "./ErrorState.css";
import { AlertTriangle } from "lucide-react";

function ErrorState({

    title = "Something went wrong",

    description = "Please try again.",

    onRetry

}) {

    return (

        <div className="ui-error-state">

            <AlertTriangle size={56} />

            <h3>{title}</h3>

            <p>{description}</p>

            {

                onRetry &&

                <button

                    className="ui-button ui-button-primary"

                    onClick={onRetry}

                >

                    Try Again

                </button>

            }

        </div>

    );

}

export default ErrorState;