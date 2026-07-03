import { X } from "lucide-react";
import "./Drawer.css";

function Drawer({

    open,

    onClose,

    title,

    children,

    width = "420px"

}) {

    if (!open) return null;

    return (

        <div

            className="ui-drawer-overlay"

            onClick={onClose}

        >

            <aside

                className="ui-drawer"

                style={{ width }}

                onClick={(e) => e.stopPropagation()}

            >

                <div className="ui-drawer-header">

                    <h2>{title}</h2>

                    <button

                        className="ui-drawer-close"

                        onClick={onClose}

                    >

                        <X size={20} />

                    </button>

                </div>

                <div className="ui-drawer-body">

                    {children}

                </div>

            </aside>

        </div>

    );

}

export default Drawer;