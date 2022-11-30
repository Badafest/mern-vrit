import { useSelector } from "react-redux";
import TodoButtons from "./TodoButtons";
import TodoTitle from "./TodoTitle";

export default function TodoList() {
  const todos = useSelector((state) => state.todo.todos);

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className="list-item">
          <TodoTitle todo={todo} />
          <TodoButtons todo={todo} />
        </div>
      ))}
    </>
  );
}
