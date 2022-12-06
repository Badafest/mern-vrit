import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { _id: "", username: "" },
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
    saveUser: (state, { payload }) => {
      state.user = { ...payload };
    },
    deleteUser: (state) => {
      state.user = { _id: "", username: "" };
    },
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
  userSlice.actions;

export default userSlice.reducer;
