import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todo/fetchAll", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    add: (state, { payload }) => {
      state.todos = [
        {
          id: state.todos.length + 1,
          title: payload,
          userId: 369,
          completed: false,
        },
        ...state.todos,
      ];
    },
    edit: (state, { payload }) => {
      state.todos = state.todos.map((todo) =>
        todo.id === payload.id ? { ...todo, title: payload.title } : todo
      );
    },
    strike: (state, { payload }) => {
      state.todos = state.todos.map((todo) =>
        todo.id === payload ? { ...todo, completed: !todo.completed } : todo
      );
    },
    remove: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
  },
  extraReducers: {
    [fetchTodos.fulfilled]: (state, { payload }) => {
      state.todos = [...payload];
    },
  },
});

export const { add, edit, strike, remove } = todoSlice.actions;

export default todoSlice.reducer;
