import "./App.css";
import { TodoContextProvider } from "./context/TodoContext";
import TodoList from "./component/TodoList";

function App() {
  return (
    <div className="App">
      <header>
        <h3>Todo Reducer</h3>
      </header>
      <TodoContextProvider>
        <TodoList />
      </TodoContextProvider>
    </div>
  );
}

export default App;
