import { useRef, useEffect } from "react";
// createPortal is used to render the modal into a DOM node outside the root app node
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  // useRef is used to reference the DOM node of the modal dialog
  const dialog = useRef();
  const modalRoot = document.getElementById("modal");

  // useEffect syncs the dialog visibility with the `open` prop
  useEffect(() => {
    const modal = dialog.current;
    // Ensure dialog ref is available
    if (!modal) return ``;

    if (open) {
      // Open dialog only if not already open
      if (!modal.open) {
        modal.showModal();
      }
    } else {
      // Close dialog only if currently open
      if (modal.open) {
        modal.close();
      }
    }
  }, [open]);

  // Handler for the `cancel` event, used to trigger the `onClose` callback
  function handleCancel(event) {
    event.preventDefault();
    if (onClose) {
      onClose();
    }
  }

  // JSX for the actual modal element
  const modalDialog = (
    <dialog
      className={`modal ${className}`}
      ref={dialog}
      onCancel={handleCancel}
      onClose={onClose}
    >
      {children}
    </dialog>
  );

  // Using createPortal here to render modalDialog into modalRoot outside the main app node
  return createPortal(modalDialog, modalRoot);
}
