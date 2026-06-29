import "./Skeleton.css";

function Skeleton({

    height = "20px",

    width = "100%",

    className = ""

}) {

    return (

        <div

            className={`ui-skeleton ${className}`}

            style={{

                height,

                width

            }}

        />

    );

}

export default Skeleton;