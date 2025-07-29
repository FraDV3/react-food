// Import React hooks and required components/utilities
import { useContext, useActionState } from "react";
import CartContext from "../store/CartContext.jsx"; // Context for cart state
import Modal from "./UI/Modal.jsx"; // Modal UI component
import { currencyFormatter } from "../util/formatting.js"; // Utility to format price
import Input from "../components/UI/Input.jsx"; // Reusable input component
import UserProgressContext from "../store/UserProgressContext.jsx"; // Context to track UI state (e.g. if checkout is open)
import Button from "./UI/Button.jsx"; // Reusable button component
import useHttp from "../hooks/useHttp.js"; // Custom HTTP hook
import Error from "./Error.jsx"; // Component to display error messages

// Request configuration object for the POST order submission
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  // Access cart state and user progress (e.g., whether modal is open)
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Custom hook for sending HTTP requests
  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  // Calculate the total amount of the cart
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  // Closes the modal without clearing the cart
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  // Closes the modal and clears cart and request state
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  // Called when form is submitted; handles request payload
  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries()); // Extract form data

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  // useActionState handles form submission and tracks status
  const [formState, formAction, isSending] = useActionState(checkoutAction, null);

  // Define modal action buttons
  let actions = (
    <>
      <Button mode="text-button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  // If request is in progress, show loading state
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  // If request succeeds, show confirmation
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Succes!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  // Render checkout form inside modal
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        
        {/* Form fields for user input */}
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {/* Display error if submission failed */}
        {error && <Error title="Failed to submit the order." message={error} />}

        {/* Submit and Close buttons or loading text */}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
