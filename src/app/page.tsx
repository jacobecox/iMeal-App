import ImageGrid from "./components/imageGrid";
import IngredientList from "./components/ingredientList";

export default function App(): JSX.Element {
  return (
    <main>
      <div className="text-center p-4">
        <h1 className="text-7xl font-bold p-6 text-white">iMeal</h1>
        <p className="text-cyan-200 text-xl">
          Generate your perfect meal, with whatever you already have in your
          home.
        </p>
      </div>
      <ImageGrid />
      <IngredientList />
    </main>
  );
}
