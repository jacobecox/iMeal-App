import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Recipe } from "./recipes";

const API_KEY: string | undefined = process.env.NEXT_PUBLIC_RECIPE_API_KEY;

export const fetchRecipeInfo = createAsyncThunk<RecipeInfo, Recipe>(
  "recipeInfo/fetchRecipeInfo",
  async (currentId) => {
    const response = await axios.get(
      //api request to get recipe information based on the current id that is selected
      `https://api.spoonacular.com/recipes/${currentId}/information?includeNutrition=true&apiKey=${API_KEY}`
    );
    return response.data;
  }
);

export interface RecipeInfo {
  //types that are used for the recipe info
  recipeInfo: any;
  id: number;
  title: string;
  readyInMinutes: number;
  image: string;
  aggregateLikes: number;
  extendedIngredients: ExtendedIngredients;
  nutrition: Nutrition;
  analyzedInstructions: AnalyzedInstructions;
  sourceUrl: string;
}

export interface ExtendedIngredients {
  id: number;
  original: string;
}

interface Nutrition {
  nutrients: Nutrients;
}

export interface Nutrients {
  name: string;
  amount: number;
  unit: string;
}

interface AnalyzedInstructions {
  steps: Steps;
}

export interface Steps {
  number: number;
  step: string;
}

interface FetchStatus {
  recipeInfo: RecipeInfo[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: FetchStatus = {
  recipeInfo: [],
  loading: false,
  error: null,
};

export const recipeInfoSlice = createSlice({
  name: "recipeInfo",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchRecipeInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecipeInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.recipeInfo.push(action.payload); //pushes the returned payload into a new array so we can map certain elements
    });
    builder.addCase(fetchRecipeInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default recipeInfoSlice.reducer;
