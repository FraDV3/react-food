// CartItem.jsx
// This component represents a single item in the shopping cart,
// displaying its name, quantity, and total price, along with buttons to adjust quantity.

import { currencyFormatter } from "../util/formatting.js"; // Utility to format numbers as currency

// CartItem component displays a cart item with its name, quantity, price, and controls to adjust quantity
export default function CartItem({
  name,       // Name of the meal
  quantity,   // Quantity of this item in the cart
  price,      // Price per unit of this item
  onIncrease, // Function to handle increasing the item quantity
  onDecrease, // Function to handle decreasing the item quantity
}) {
  return (
    <li className="cart-item">
      {/* Display the name of the item, quantity, and formatted price */}
      <p>
        {name} - {quantity} * {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        {/* Button to decrease quantity */}
        <button onClick={onDecrease}>-</button>
        {/* Display the current quantity */}
        <span>{quantity}</span>
        {/* Button to increase quantity */}
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
