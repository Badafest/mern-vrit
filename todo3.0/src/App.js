import "./App.css";

import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { TodoContextProvider } from "./context/TodoContext";

import AppHeader from "./components/AppHeader";
import TodoList from "./components/TodoList";

const THEME_STYLE = (isDark) =>
  isDark
    ? { backgroundColor: "black", color: "white" }
    : { backgroundColor: "white", color: "black" };

function App() {
  const [isDark, _] = useContext(ThemeContext);
  return (
    <div className="App" style={THEME_STYLE(isDark)}>
      <AppHeader />
      <TodoContextProvider>
        <TodoList />
      </TodoContextProvider>
    </div>
  );
}

export default App;
