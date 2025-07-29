// Custom hook to perform HTTP requests and manage loading and error states
import useHttp from "../hooks/useHttp.js";

// Component to display error messages
import Error from "./Error.jsx";

// Component to render individual meal items
import MealItem from "./MealItem.jsx";

// Configuration object for the HTTP request (empty in this case)
const requestConfig = {};

// Meals component: Fetches and displays a list of meals from the server
export default function Meals() {
  // Call the custom hook to fetch data and get back state values
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  // Show loading message while the meals are being fetched
  if (isLoading) {
    return <p className="center">Fetching meals...</p>
  }

  // Show error message if the fetch operation failed
  if (error) {
    return <Error title="Failed to fetch meals." message={error} />
  }

  // Once meals are loaded, map each meal object to a MealItem component
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          price={meal.price}
          description={meal.description}
          image={meal.image}
        />
      ))}
    </ul>
  );
}