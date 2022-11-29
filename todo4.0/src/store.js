import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import todoReducer from "./slices/todoSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});
