import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles.css";

function Modal({ open, onClose, children, titleId = "modal-title" }) {
    // Lås body-scroll når åben
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [open]);

    // ESC for at lukke
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="modal-backdrop"
            onClick={onClose} // klik på backdrop lukker
        >
            <div
                className="modal-surface"
                onClick={(e) => e.stopPropagation()} // klik inde i modal lukker ikke
            >
                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal;