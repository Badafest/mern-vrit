import { useEffect, useState } from "react";

const URL = "https://jsonplaceholder.typicode.com/todos";

const decorateTodo = (todo) => ({
  title: `Todo Item ${todo.id}`,
  subtitle: todo.title,
  crossed: todo.completed,
  meta: {
    "🖊": todo.author || (todo.userId && `User ${todo.userId}`) || "Anonymous",
    "🕒": `${
      todo.updatedAt ||
      new Date("Fri Nov 16 2022 13:58:21 GMT+0545 (Nepal Time)").getTime()
    }`,
  },
});

const mockTodo = (index) => ({
  id: index + 1,
  userId: Math.ceil((index + 1) / 10),
  title: "this is a very important task!",
  completed: Math.random() < 0.5,
});

const useFetch = () => {
  const [todos, setTodos] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const setTodosAfterFetch = (data) => {
    setTodos(data.map((todo) => decorateTodo(todo)));
    setDataLoading((_) => false);
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setTodosAfterFetch(data);
    } catch (err) {
      console.log("ERROR IN FETCHING TODOS ==>", err.message);
      throw err;
    }
  };

  const mockFetchTodos = async () => {
    try {
      const data = Array(200)
        .fill(1)
        .map((_, index) => mockTodo(index));
      setTodosAfterFetch(data);
    } catch (err) {
      console.log("ERROR IN FETCHING TODOS ==>", err.message);
      throw err;
    }
  };

  useEffect(() => {
    try {
      fetchTodos();
    } catch (err) {
      mockFetchTodos();
    }
  }, []);

  return [todos, dataLoading];
};

export default useFetch;
