import AppTitle from "./TodoAppCard/AppTitle";
import AddTodo from "./TodoAppCard/AddTodo";
import TodoList from "./TodoAppCard/TodoList";
import TodoFooter from "./Footer";

import useFetch from "../functions/useFetch";
import { useEffect, useState } from "react";

const TodoAppCard = () => {
  const appTitle = "Todo App";

  const [data, loading] = useFetch();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(data);
  }, [data]);

  const onAddTodo = (todo) => {
    if (todo.title.length) {
      setTodos((prev) => [todo, ...prev]);
    }
  };

  const onCrossItem = (index) => {
    const crossed = !todos[index].crossed;
    setTodos((prev) =>
      prev.map((todo, idx) =>
        idx === index ? { ...todo, crossed } : { ...todo }
      )
    );
  };

  const onEditItem = (todo, index) => {
    setTodos((prev) => prev.map((data, idx) => (idx === index ? todo : data)));
  };

  const onClearAll = () => {
    setTodos((_) => []);
  };

  const onDeleteItem = (index) => {
    setTodos((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="card">
      <AppTitle title={appTitle} />
      <AddTodo onAddTodo={onAddTodo} />
      <TodoList
        todos={todos}
        onCrossItem={onCrossItem}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
      />
      {loading ? (
        <div>Loading Data...</div>
      ) : (
        <TodoFooter todos={todos} onClearAll={onClearAll} />
      )}
    </div>
  );
};

export default TodoAppCard;
