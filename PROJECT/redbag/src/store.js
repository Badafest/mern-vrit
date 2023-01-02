import { configureStore } from "@reduxjs/toolkit";

import CartReducer from "./slices/cart.slice";
import FavoritesReducer from "./slices/favorites.slice";
import CategoryReducer from "./slices/category.slice";
import VendorReducer from "./slices/vendor.slice";
import ProductReducer from "./slices/product.slice";

export default configureStore({
  reducer: {
    cart: CartReducer,
    favorites: FavoritesReducer,
    category: CategoryReducer,
    vendor: VendorReducer,
    product: ProductReducer,
  },
});
