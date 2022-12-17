import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchAll = createAsyncThunk(
  "product/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/product/fetch_all");
      return response.data.products;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
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

export default ProductSlice.reducer;
