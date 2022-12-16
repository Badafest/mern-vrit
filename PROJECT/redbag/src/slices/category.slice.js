import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchAll = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/category/fetch_json");
      return response.data.categories;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, { payload }) => {
      state.value = payload;
    });
  },
});
// export const { fetchAll } = CategorySlice.actions;
export default CategorySlice.reducer;
