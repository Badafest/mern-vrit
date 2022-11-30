import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

import { TodoActions } from "../action/TodoAction";

const TodoList = () => {
  const [todos, dispatch] = useContext(TodoContext);
  return todos.map((todo, index) => (
    <div
      key={index}
      onClick={() => dispatch({ type: TodoActions.COMPLETED, payload: index })}
      style={
        todo.completed
          ? { textDecoration: "line-through", cursor: "pointer" }
          : { cursor: "pointer" }
      }
    >
      {todo.title}
    </div>
  ));
};

export default TodoList;
