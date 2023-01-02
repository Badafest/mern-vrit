import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchUserFavorites = createAsyncThunk(
  "favorites/fetchUserFavorites",
  async () => {
    const { data } = await axios.get("/user/favorites");
    return data.favorites;
  }
);

export const FavoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    products: [],
  },

  reducers: {
    addToFavorites: (state, { payload }) => {
      state.products.push(payload);
    },

    removeFromFavorites: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product._id !== payload
      );
    },

    clearFavorites: (state) => {
      state.products = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserFavorites.fulfilled, (state, { payload }) => {
      state.products = payload;
    });
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  FavoritesSlice.actions;

export default FavoritesSlice.reducer;
