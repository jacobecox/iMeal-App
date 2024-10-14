import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY: string | undefined = process.env.NEXT_PUBLIC_RECIPE_API_KEY;

export const fetchRecipes = createAsyncThunk<Recipes, IngredientRequirements>(
  "recipes/fetchRecipes",
  async ({ formattedIngredients, ignorePantry }) => {
    const response = await axios.get(
      //api request to get recipes based on ingredients and whether ignorePantry is checked
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedIngredients}&number=15&ignorePantry=${ignorePantry}&apiKey=${API_KEY}`
    );
    return response.data;
  }
);

interface IngredientRequirements {
  formattedIngredients: string[];
  ignorePantry: boolean;
}

export interface Recipes {
  recipes: Recipe;
}

export interface Recipe {
  //types that are used for the recipes
  recipes: any;
  title: string;
  image: string;
  id: number;
  usedIngredientCount: number;
  missedIngredientCount: number;
}

interface FetchStatus {
  recipes: Recipes[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: FetchStatus = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes.push(action.payload); //pushes returned payload into an array so we can map certain elements
    });
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default recipesSlice.reducer;
