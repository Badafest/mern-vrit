import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slices/cart.slice";
import CategoryReducer from "./slices/category.slice";

export default configureStore({
  reducer: {
    cart: CartReducer,
    category: CategoryReducer,
  },
});
