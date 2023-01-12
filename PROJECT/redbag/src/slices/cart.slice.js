import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async () => {
    const { data } = await axios.get("/user/cart");
    return data.cart;
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [
      // {
      //   item: {},
      //   quantity: 0,
      // },
    ],
    payment: "card",
  },

  reducers: {
    addToCart: (state, { payload }) => {
      state.products.push({ item: payload, quantity: 1 });
    },

    removeFromCart: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product.item._id !== payload
      );
    },

    changeQuantity: (state, { payload }) => {
      const { _id, change } = payload;
      state.products = state.products.map((product) =>
        product.item._id === _id
          ? { ...product, quantity: product.quantity + change }
          : product
      );
    },

    clearCart: (state) => {
      state.products = [];
    },

    setPayment: (state, { payload }) => {
      state.payment = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.fulfilled, (state, { payload }) => {
      state.products = payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  clearCart,
  setPayment,
} = CartSlice.actions;

export default CartSlice.reducer;
