"use client";
import { useState, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../store/slices/recipes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AppDispatch } from "../store/configureStore";
import { useRouter } from "next/navigation";

export default function IngredientList(): JSX.Element {
  const [ingredients, setIngredients] = useState<string[]>([]); //array of ingredients that are added
  const [inputValue, setInputValue] = useState<string>(""); //value of input field for entering ingredients

  const submitIngredient = (e: FormEvent<HTMLFormElement>) => {
    //pushes ingredient in input to ingredients array
    if (inputValue.length > 0) {
      e.preventDefault();
      setIngredients([...ingredients, inputValue]);
      setInputValue("");
    } else {
      alert("Enter an ingredient to get started"); //checks to make sure an ingredient is currently in the input field
    }
  };

  const deleteIngredient = (index: number) => {
    //finds the index of the ingrient selected and filters the ingredient out of the map
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const formatIngredients = (ingredients: string[]) => {
    return ingredients.join(",+"); //inserts a , and + between ingredients for url search criteria
  };

  const [ignorePantry, setIgnorePantry] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //when checked is set to true, household ingredients will be automatically included in ingredients
    setIgnorePantry(e.target.checked);
  };
  const formattedIngredients: any = formatIngredients(ingredients); //creates a new array for ingredients including the +, in between ingredients which will be used in api request

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [recipeButton, setRecipeButton] = useState<boolean>(false); //button function to submit ingredients and find recipes

  const handleSubmit = () => {
    //checks to make sure there are ingredients before sending api request
    if (ingredients.length > 0) {
      setRecipeButton(true);
      router.push("/recipes"); //pushes user to new page where recipes will be displayed
    } else {
      alert("Add an ingredient before searching"); //if there are no ingredients added, alert to add ingredients
    }
  };

  useEffect(() => {
    if (recipeButton) {
      dispatch(fetchRecipes({ formattedIngredients, ignorePantry }));
    }
  }, [dispatch, formattedIngredients, ignorePantry, recipeButton]); //listens for when recipe button is pushed and dispatches api request with array of ingredients and ignorePantry status

  return (
    <div className="text-center p-4 h-screen">
      <h1 className="text-white text-3xl font-bold p-6">
        Create a list of ingredients you already have
      </h1>
      <form onSubmit={submitIngredient}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add your ingredients here"
          className="shadow-lg rounded-md p-2 w-60 text-center"
        />
        <button
          className="text-white bg-transparent border-2 border-white shadow-lg p-1 m-2 font-bold rounded-md hover:bg-cyan-900 hover:text-white"
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="text-center text-white p-2">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={ignorePantry}
          className=" m-1"
        />
        Include common household items (salt, pepper, water, oil etc.)
      </div>
      <div className="flex justify-center">
        <div className=" p-2 shadow-lg bg-cyan-900 m-4 w-2/3 h-auto">
          <h1 className="text-white text-xl p-2 underline">My Ingredients</h1>
          <div className="grid grid-cols-3 gap-4">
            {ingredients.length === 0 ? (
              <div className="text-cyan-200 text-lg m-6 col-span-3">
                No ingredients yet
              </div>
            ) : (
              ingredients.map((ingredient, index) => (
                <div key={index} className="text-cyan-200 text-lg">
                  <button
                    className="text-xs m-1"
                    onClick={() => deleteIngredient(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  {ingredient}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="text-cyan-900 border-2 bg-white shadow-lg p-3 m-4 font-extrabold rounded-md hover:bg-cyan-900 hover:text-white"
        type="button"
      >
        Find Recipes
      </button>
    </div>
  );
}
