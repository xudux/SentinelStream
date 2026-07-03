import { X } from "lucide-react";
import "./Modal.css";

function Modal({
    open,
    onClose,
    title,
    children,
    footer,
    size = "md"
}) {

    if (!open) return null;

    return (

        <div
            className="ui-modal-overlay"
            onClick={onClose}
        >

            <div
                className={`ui-modal ui-modal-${size}`}
                onClick={(e) => e.stopPropagation()}
            >

                <div className="ui-modal-header">

                    <h2>{title}</h2>

                    <button
                        className="ui-modal-close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>

                </div>

                <div className="ui-modal-body">

                    {children}

                </div>

                {footer && (

                    <div className="ui-modal-footer">

                        {footer}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Modal;