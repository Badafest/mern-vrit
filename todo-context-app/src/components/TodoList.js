import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { TodoContext } from "../context/TodosContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, toggleTodoCompleted] = useContext(TodoContext);
  const [theme, _] = useContext(ThemeContext);
  return (
    <div className={"todo-list-main " + theme}>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onClick={() => toggleTodoCompleted(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
