"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/configureStore";
import { Recipes, Recipe } from "../store/slices/recipes";
import LoadingSpinner from "../components/loadingSpinner";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecipeInfo } from "../store/slices/recipeInfo";

export default function RenderRecipes() {
  const recipes = useSelector((state: Recipes) => state.recipes.recipes); //accesses recipes info to display
  const loading = useSelector((state: RootState) => state.recipes.loading); //accesses loading state

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentId, setCurrentId] = useState(null); //whatever the current id selected is will be set here

  const handleBackClick = () => {
    router.push(`/`); //back button to return to home page
  };

  const handleClick = (id: number) => {
    setCurrentId(id);
    router.push(`/recipeinfo/${id}`); //when an id is selected this will push user to new page to see recipe info
  };

  useEffect(() => {
    if (currentId !== null) {
      dispatch(fetchRecipeInfo(currentId)); //listens for when the current id changes and dispatched the api call to load recipe info with current id
    }
  }, [dispatch, currentId]);

  if (loading === true) {
    return <LoadingSpinner />; //show loading spinner if loading
  }
  if (recipes.length === 0) {
    //if there are no recipes to show then return this
    return (
      <div className="text-center p-4 h-screen">
        <h1 className="text-white text-3xl font-bold p-6">No Recipes Found</h1>
        <button
          onClick={handleBackClick}
          className="text-cyan-900 border-2 text-lg bg-white shadow-lg p-2 m-2 font-extrabold rounded-md hover:bg-cyan-900 hover:text-white"
        >
          Back
        </button>
      </div>
    );
  }
  return (
    <div className="text-center p-4 h-screen">
      <button
        onClick={handleBackClick}
        className="text-cyan-900 border-2 text-lg bg-white shadow-lg p-2 m-2 font-extrabold rounded-md hover:bg-cyan-900 hover:text-white"
      >
        Back
      </button>
      <h1 className="text-white text-5xl font-bold p-8">Recipes</h1>

      <div
        className="
      flex justify-center"
      >
        <div className=" p-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {recipes[0].map((recipe: Recipe) => {
            //maps recipes and displays their info on each map
            return (
              <div
                key={recipe.id}
                className="bg-cyan-900 text-white rounded-3xl p-1 m-1"
              >
                <div>
                  <h1 className="text-2xl p-2">{recipe.title}</h1>
                  <button
                    onClick={() => handleClick(recipe.id)}
                    className="bg-cyan-500 rounded-md p-1 font-bold shadow-lg hover:bg-white hover:text-cyan-900"
                  >
                    View Details
                  </button>
                </div>
                <div className="flex  items-center justify-center  p-2">
                  <img src={recipe.image} className="rounded-md object-cover" />
                </div>
                <div>
                  <h1 className="text-cyan-200">
                    Used Ingredients: {recipe.usedIngredientCount}
                  </h1>
                  <h1 className="text-cyan-200">
                    Missed Ingredients: {recipe.missedIngredientCount}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
