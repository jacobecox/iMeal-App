"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  RecipeInfo,
  ExtendedIngredients,
  Nutrients,
  Steps,
} from "@/app/store/slices/recipeInfo";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { RootState } from "@/app/store/configureStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Recipe() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/recipes`); //returns to the recipes page when the back button is clicked
  };

  const recipeInfo = useSelector(
    (state: RecipeInfo) => state.recipeInfo.recipeInfo
  ); //accesses the recipe info for each recipe

  const loading = useSelector((state: RootState) => state.recipeInfo.loading); //accesses the loading state

  if (loading === true) {
    return <LoadingSpinner />;
  } // determines if loading spinner should be displayed

  if (recipeInfo.length === 0) {
    //if there are no recipes to display then return this
    return (
      <div className="text-center p-4 h-screen">
        <h1 className="text-white text-3xl font-bold p-6">
          Recipe info not found
        </h1>
        <button
          onClick={handleClick}
          className="text-cyan-900 border-2 text-lg bg-white shadow-lg p-2 m-2 font-extrabold rounded-md"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <button
            onClick={handleClick}
            className="text-cyan-900 border-2 text-lg bg-white shadow-lg p-2 ml-6 mt-6 font-extrabold rounded-md hover:bg-cyan-900 hover:text-white"
          >
            Back
          </button>
        </div>
        <h1 className="text-white text-5xl text-center p-6">
          {recipeInfo[recipeInfo.length - 1].title}
        </h1>
      </div>
      <div className=" lg:flex flex-wrap justify-center items-center p-4">
        <div className="bg-cyan-900 text-white text-2xl p-4 text-center rounded-md mx-40  lg:mx-0">
          <div>Ready in </div>
          {recipeInfo[recipeInfo.length - 1].readyInMinutes} minutes
        </div>
        <img
          src={recipeInfo[recipeInfo.length - 1].image}
          className="rounded-3xl object-cover p-4"
        />
        <div className="bg-cyan-900 text-white p-4 text-3xl rounded-md text-center mx-40 lg:mx-0">
          {recipeInfo[recipeInfo.length - 1].aggregateLikes === 1 ? ( //if there is 1 like then make likes singular, else make like plural
            <p>{recipeInfo[recipeInfo.length - 1].aggregateLikes} like</p>
          ) : (
            <p>{recipeInfo[recipeInfo.length - 1].aggregateLikes} likes</p>
          )}
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
      <div className="lg:flex flex-wrap justify-normal mx-20 p-4">
        <div className=" flex-1 bg-cyan-900 text-center rounded-md m-4 mx-0 lg:m-4 p-4">
          <h1 className="text-white text-5xl pb-6 pt-2">Ingredients</h1>
          {recipeInfo[recipeInfo.length - 1].extendedIngredients.map(
            //maps ingredients needed for recipe
            (extendedIngredient: ExtendedIngredients) => {
              return (
                <div key={extendedIngredient.id} className="text-left">
                  <h1 className="text-cyan-200 p-2 text-lg">
                    - {extendedIngredient.original}
                  </h1>
                </div>
              );
            }
          )}
        </div>
        <div className="flex-1 bg-cyan-900 m-4 mx-0 lg:m-4 p-2 rounded-md">
          <h1 className="text-white text-5xl pb-6 pt-2 text-center">
            Nutrition Facts
          </h1>
          <div className="flex flex-wrap">
            {recipeInfo[recipeInfo.length - 1].nutrition.nutrients.map(
              //maps nutrition facts for recipe
              (nutrient: Nutrients) => {
                return (
                  <div key={nutrient.name} className="text-center p-2 w-1/3">
                    <h1 className="text-white text-lg">{nutrient.name}</h1>
                    <h1 className="text-cyan-200 text-lg">
                      {nutrient.amount}
                      {nutrient.unit}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <div className="bg-cyan-200 p-4 mx-10 lg:mx-40 my-6 rounded-md">
        <div className="text-cyan-900 text-center text-5xl font-bold">
          Recipe
        </div>
        <div className="p-4 text-xl">
          {recipeInfo[recipeInfo.length - 1].analyzedInstructions[0].steps.map(
            //maps instructions and steps to display recipe step by step
            (step: Steps) => {
              return (
                <div key={step.number}>
                  <h1 className="bg-cyan-900 rounded-md text-white font-bold p-2">
                    Step {step.number}
                  </h1>
                  <h1 className="p-4 text-cyan-900">{step.step}</h1>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="p-4 mx-10 lg:mx-80 my-6 text-center">
        <a
          href={recipeInfo[recipeInfo.length - 1].sourceUrl} //link to full recipe
          target="_blank"
          className="text-white text-3xl font-bold underline hover:text-cyan-900"
        >
          Full Recipe Here!
        </a>
      </div>
    </div>
  );
}
