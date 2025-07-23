import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();
  const modalRoot = document.getElementById("modal");

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return ``;

    if (open) {
      if (!modal.open) {
        modal.showModal();
      }
    } else {
      if (modal.open) {
        modal.close();
      }
    }
  }, [open]);

  function handleCancel(event) {
    event.preventDefault();
    if (onClose) {
      onClose();
    }
  }

  const modalDialog = (
    <dialog
      className={`modal ${className}`}
      ref={dialog}
      onCancel={handleCancel}
    >
      {children}
    </dialog>
  );

  return createPortal(modalDialog, modalRoot);
}
