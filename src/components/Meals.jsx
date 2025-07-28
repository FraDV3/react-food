import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    <p>Fetching meals...</p>
  }

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
