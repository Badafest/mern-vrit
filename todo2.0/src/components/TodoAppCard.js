import { useEffect, useState } from "react";

import AppTitle from "./TodoAppCard/AppTitle";
import AddTodo from "./TodoAppCard/AddTodo";
import TodoList from "./TodoAppCard/TodoList";
import TodoFooter from "./Footer";

import fetchTodos from "../functions/fetchTodos";

const TodoAppCard = () => {
  const appTitle = "Todo App";
  const URL = "https://jsonplaceholder.typicode.com/todos";

  const [todos, setTodos] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const setTodosAfterFetch = (data) => {
    setTodos(
      data.map((todo) => ({
        title: `Todo Item ${todo.id}`,
        subtitle: todo.title,
        crossed: todo.completed,
        meta: {
          "🖊":
            todo.author ||
            (todo.userId && `User ${todo.userId}`) ||
            "Anonymous",
          "🕒": `${
            todo.updatedAt ||
            new Date("Fri Nov 16 2022 13:58:21 GMT+0545 (Nepal Time)").getTime()
          }`,
        },
      }))
    );
    setDataLoading((_) => false);
  };

  useEffect(() => {
    fetchTodos(URL, setTodosAfterFetch);
  }, []);

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
    setTodos((prev) => [
      ...[...prev].splice(0, index),
      todo,
      ...[...prev].splice(index + 1, prev.length),
    ]);
  };

  const onClearAll = () => {
    setTodos((_) => []);
  };

  const onDeleteItem = (index) => {
    setTodos((prev) => [
      ...[...prev].splice(0, index),
      ...[...prev].splice(index + 1, prev.length),
    ]);
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
      {dataLoading ? (
        <div>Loading Data...</div>
      ) : (
        <TodoFooter todos={todos} onClearAll={onClearAll} />
      )}
    </div>
  );
};

export default TodoAppCard;
