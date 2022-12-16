import { configureStore } from "@reduxjs/toolkit";

import CartReducer from "./slices/cart.slice";
import CategoryReducer from "./slices/category.slice";
import VendorReducer from "./slices/vendor.slice";

export default configureStore({
  reducer: {
    cart: CartReducer,
    category: CategoryReducer,
    vendor: VendorReducer,
  },
});
