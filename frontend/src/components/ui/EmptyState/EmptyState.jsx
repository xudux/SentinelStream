import "./EmptyState.css";
import { Inbox } from "lucide-react";

function EmptyState({

    title = "No data found",

    description = "There is nothing to display."

}) {

    return (

        <div className="ui-empty-state">

            <Inbox size={56} />

            <h3>{title}</h3>

            <p>{description}</p>

        </div>

    );

}

export default EmptyState;