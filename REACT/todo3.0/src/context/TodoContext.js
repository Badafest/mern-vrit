import { createContext, useEffect, useReducer } from "react";
import { TodoActions } from "../actions/TodoActions";
import { TodoController } from "../controllers/TodoController";
import { INITIAL_TODOS } from "../store";

export const TodoContext = createContext();

const URL = "https://jsonplaceholder.typicode.com/todos";

export const TodoContextProvider = (props) => {
  const [todos, dispatch] = useReducer(TodoController, INITIAL_TODOS);

  const fetchTodos = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    dispatch({ type: TodoActions.FETCH, payload: data });
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
