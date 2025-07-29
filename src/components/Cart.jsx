import { useContext } from "react";

import CartContext from "../store/CartContext.jsx";
import Modal from "./UI/Modal.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Calculate the total price of all items in the cart
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  // Close the cart modal
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  // Switch to the checkout view when "Go to Checkout" is clicked
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  // Render the cart modal UI with a list of cart items and total amount
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {/* Render each cart item with controls to increase or decrease quantity */}
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      {/* Display the formatted total cart amount */}
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      {/* Render action buttons to close the modal or proceed to checkout */}
      <p className="modal-actions">
        <Button mode="text-button" onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button type="button" onClick={handleGoToCheckout}>
            Go to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}
