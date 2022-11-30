import "./App.css";

import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { TodoContextProvider } from "./context/TodoContext";

import AppHeader from "./components/AppHeader";
import TodoList from "./components/TodoList";

// const THEME_STYLE = (isDark) =>
//   isDark
//     ? { backgroundColor: "#00111a", color: "#f2e9e4" }
//     : { backgroundColor: "#f2e9e4", color: "#00111a" };

function App() {
  const [isDark, _] = useContext(ThemeContext);
  return (
    <div className={isDark ? "App dark" : "App light"}>
      <AppHeader />
      <TodoContextProvider>
        <TodoList />
      </TodoContextProvider>
    </div>
  );
}

export default App;
