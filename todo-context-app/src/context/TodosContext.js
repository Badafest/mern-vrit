import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const URL = "https://jsonplaceholder.typicode.com/todos";
    const response = await fetch(URL);
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleTodoCompleted = (index) => {
    setTodos((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <TodoContext.Provider value={[todos, toggleTodoCompleted]}>
      {props.children}
    </TodoContext.Provider>
  );
};
