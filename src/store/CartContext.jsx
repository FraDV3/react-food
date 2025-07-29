// Set up the initial structure of the cart context
import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

// Reducer function for managing cart state
function cartReducer(state, action) {
  // Handle adding an item to the cart
  if (action.type === "ADD_ITEM") {
    // Find if the item already exists in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      // Update quantity of existing item
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // Add new item with quantity 1
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  // Handle removing an item from the cart
  if (action.type === "REMOVE_ITEM") {
    // Find the item to remove
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      // Remove item entirely if quantity is 1
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      // Decrease quantity by 1
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  // Handle clearing all items from the cart
  if (action.type === "CLEAR_CART") {
    // Reset items to empty array
    return { ...state, items: [] };
  }

  return state;
}

// Context provider component
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // Function to add an item to the cart, dispatches ADD_ITEM action
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  // Function to remove an item from the cart, dispatches REMOVE_ITEM action
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  // Function to clear the entire cart, dispatches CLEAR_CART action
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  // Value passed to the context provider, exposing state and functions
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  // Provide the cart context to child components
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
