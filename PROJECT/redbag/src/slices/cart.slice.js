import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [
      // {
      //   item: {},
      //   quantity: 0,
      // },
    ],
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
  },
});

export const { addToCart, removeFromCart, changeQuantity } = CartSlice.actions;

export default CartSlice.reducer;
