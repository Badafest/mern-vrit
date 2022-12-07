import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./features/cart/cart.slice";

export default configureStore({
  reducer: {
    cart: CartReducer,
  },
});
