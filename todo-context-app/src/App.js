import "./App.css";
import { TodoContextProvider } from "./context/TodosContext";

import TodoList from "./components/TodoList";
import { ThemeContextProvider } from "./context/ThemeContext";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <ThemeContextProvider>
      <TodoContextProvider>
        <div className="App">
          <AppHeader />
          <TodoList />
        </div>
      </TodoContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
