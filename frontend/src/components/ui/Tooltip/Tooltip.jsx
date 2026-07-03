import "./Tooltip.css";

function Tooltip({

    text,

    children,

    position = "top"

}) {

    return (

        <span className="ui-tooltip-wrapper">

            {children}

            <span
                className={`ui-tooltip ui-tooltip-${position}`}
            >

                {text}

            </span>

        </span>

    );

}

export default Tooltip;