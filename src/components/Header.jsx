// Import required dependencies and context
import { useContext } from "react";

import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  // Access the CartContext to get information about cart items
  const cartCtx = useContext(CartContext);
  // Access the UserProgressContext to control UI flow like opening the cart modal
  const userProgressCtx = useContext(UserProgressContext);

  // Calculate total number of items in the cart by summing up the quantity of each item
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  // Function to trigger the cart modal opening via context
  function handleShowCart() {
    userProgressCtx.showCart();
  }

  // Render the app header with logo, title, and cart button
  return (
    <header id="main-header">
      <div id="title">
        <img
          src={logoImg}
          alt="Colorful sunset cityscape with plate and wine glasses"
        />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        {/* Button that opens the cart modal and displays the current item count */}
        <Button mode="text-button" onClick={handleShowCart} >Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
