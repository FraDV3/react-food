import { useContext } from "react";
// React hook to access context data

import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({ id, name, price, description, image }) {
  const cartCtx = useContext(CartContext);

  // Adds the current meal to the cart context when the button is clicked
  function handleAddMealToCart() {
    cartCtx.addItem({ id, name, price, description, image });
  }
  
  return (
    // Render a single meal item with image, name, price, description, and "Add to Cart" button
    <li className="meal-item">
      <article>
        {/* Display meal image, using path relative to server */}
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          {/* Meal name */}
          <h3>{name}</h3>
          {/* Meal price formatted as currency */}
          <p className="meal-item-price">{currencyFormatter.format(price)}</p>
          {/* Meal description */}
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          {/* Button to add the meal to the cart */}
          <Button type="button" onClick={handleAddMealToCart}>
            {" "}
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );

}
