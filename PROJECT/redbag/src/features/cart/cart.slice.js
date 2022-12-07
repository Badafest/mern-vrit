import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [
      {
        _id: "",
        name: "",
        category: "",
        vendor: "",
        description: "",
        price: "",
      },
    ],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      state.cart.push(...payload);
    },
    removeFromCart: (state, { payload }) => {
      const { _id } = payload;
      state.cart = state.cart.filter((product) => product._id !== _id);
    },
  },
});

export const { saveUser, deleteUser, addToCart, removeFromCart } =
  CartSlice.actions;

export default CartSlice.reducer;
