import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchAll = createAsyncThunk(
  "vendor/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/vendor/fetch_all");
      return response.data.vendors;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const VendorSlice = createSlice({
  name: "vendor",
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

export default VendorSlice.reducer;
