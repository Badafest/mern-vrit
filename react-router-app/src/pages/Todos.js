import TodoList from "../components/TodoList";
import { TodoContextProvider } from "../context/TodoContext";

function Todos() {
  return (
    <TodoContextProvider>
      <TodoList />
    </TodoContextProvider>
  );
}

export default Todos;
