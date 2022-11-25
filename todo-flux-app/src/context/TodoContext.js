import { createContext, useEffect, useReducer } from "react";

import { InitialTodos } from "../store/InitialTodos";
import { TodoController } from "../controllers/TodoController";
import { TodoActions } from "../action/TodoAction";

export const TodoContext = createContext();

export const TodoContextProvider = (props) => {
  const [todos, dispatch] = useReducer(TodoController, InitialTodos);

  const fetchTodos = async () => {
    const URL = "https://jsonplaceholder.typicode.com/todos";
    const response = await fetch(URL);
    const data = await response.json();
    dispatch({ type: TodoActions.ADD, payload: data });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={[todos, dispatch]}>
      {props.children}
    </TodoContext.Provider>
  );
};
