import { combineReducers } from "@reduxjs/toolkit";
import recipesReducer from "./slices/recipes";
import recipeInfoReducer from "./slices/recipeInfo";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  recipeInfo: recipeInfoReducer,
});

export default rootReducer;
