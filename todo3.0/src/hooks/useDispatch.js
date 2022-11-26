import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { TodoActions } from "../actions/TodoActions";

const useDispatch = () => {
  const [_, dispatch] = useContext(TodoContext);

  const handleAddTodo = (title) =>
    dispatch({ type: TodoActions.ADD, payload: title });

  const handleEditTodo = (title, todo) =>
    dispatch({ type: TodoActions.EDIT, payload: { ...todo, title } });

  const handleDeleteTodo = (title, todo) =>
    dispatch({ type: TodoActions.DELETE, payload: todo.id });

  return { handleAddTodo, handleEditTodo, handleDeleteTodo };
};

export default useDispatch;
