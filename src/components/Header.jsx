import { useContext } from "react";

import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

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
        <Button mode="text-button" onClick={handleShowCart} >Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
