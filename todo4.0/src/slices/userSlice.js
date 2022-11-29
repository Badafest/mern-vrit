import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    current: { username: "", password: "" },
  },
  reducers: {
    register: (state, { payload }) => {
      const isUsernameTaken = state.users.filter(
        (user) => user.username === payload.username
      );
      if (isUsernameTaken?.length === 0) {
        state.users.push({ ...payload });
      } else {
        throw "Username is already taken";
      }
    },
    login: (state, { payload }) => {
      const validUser = state.users.filter(
        (user) =>
          user.username === payload.username &&
          user.password === payload.password
      );
      if (validUser?.length === 1) {
        state.current = { ...payload };
      } else {
        throw "Username or Password is incorrect";
      }
    },
    logout: (state) => {
      state.current = { username: "", password: "" };
    },
  },
});

export const { register, login, logout } = userSlice.actions;

export default userSlice.reducer;
