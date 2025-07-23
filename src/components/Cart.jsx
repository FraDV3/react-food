import { useContext } from "react";

import CartContext from "../store/CartContext.jsx";
import Modal from "./UI/Modal.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
            <button onClick={() => cartCtx.addItem({ ...item, quantity: 1 })}>
              +
            </button>
            <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
          </li>
        ))}
      </ul>
      <p>{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button mode="text-button" onClick={handleCloseCart}>Close</Button>
        <Button>Checkout</Button>
      </p>
    </Modal>
  );
}
