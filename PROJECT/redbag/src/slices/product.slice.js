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

export const fetchRandom = createAsyncThunk(
  "product/fetchRandom",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/product/fetch_random");
      return response.data.products;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchById = createAsyncThunk(
  "product/fetchById",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.get("/product/fetch_by_id/" + _id);
      return response.data.products;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchFiltered = createAsyncThunk(
  "product/fetchFiltered",
  async (filter, { rejectWithValue }) => {
    const { category, vendor, price, index, total } = filter;
    try {
      const response = await axios.post("/product/fetch_filtered", {
        category,
        vendor,
        price,
        index,
        total,
      });
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
    builder.addCase(fetchRandom.fulfilled, (state, { payload }) => {
      state.value = payload;
    });
    builder.addCase(fetchById.fulfilled, (state, { payload }) => {
      state.value = payload;
    });
    builder.addCase(fetchFiltered.fulfilled, (state, { payload }) => {
      state.value = payload;
    });
  },
});

export default ProductSlice.reducer;
