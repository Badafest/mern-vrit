import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

import TodoButons from "./TodoButtons";
import TodoTitle from "./TodoTitle";

const Todos = ({ handleDelete, handleEdit }) => {
  const [todos] = useContext(TodoContext);
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <div key={index} className="todo-item">
          <TodoTitle todo={todo} />
          <TodoButons
            handleDelete={() => handleDelete(todo)}
            handleEdit={() => handleEdit(todo)}
          />
        </div>
      ))}
    </div>
  );
};

export default Todos;
