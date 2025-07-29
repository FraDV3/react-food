// This context manages the user's progress through different UI stages (e.g. viewing cart or checkout)
import { createContext, useState } from "react";

// Create a context with default values (mostly placeholder functions)
const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

// Context provider component to wrap around components that need access to user progress
export function UserProgressContextProvider({ children }) {
  // Internal state to track what the user is currently viewing: "", "cart", or "checkout"
  const [userProgress, setUserProgress] = useState("");

  // Show the cart modal
  function showCart() {
    setUserProgress("cart");
  }
  // Hide the cart modal
  function hideCart() {
    setUserProgress("");
  }
  // Show the checkout modal
  function showCheckout() {
    setUserProgress("checkout");
  }
  // Hide the checkout modal
  function hideCheckout() {
    setUserProgress("");
  }

  // Context value containing current progress and control functions
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  // Provide the context value to all child components
  return (
    <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
  );
}

export default UserProgressContext;
