import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },

  reducers: {
    addToCart: (state, { payload }) => {
      state.products.push(...payload);
    },

    removeFromCart: (state, { payload }) => {
      const { _id } = payload;
      state.products = state.cart.filter((product) => product._id !== _id);
    },
  },
});

export const { addToCart, removeFromCart } = CartSlice.actions;

export default CartSlice.reducer;
