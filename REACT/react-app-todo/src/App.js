import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TodoAppCard />
    </div>
  );
}

function TodoAppCard() {
  const appTitle = "Todo App";
  const listData = [
    { title: "Buy a laptop", crossed: true },
    { title: "Buy a mouse", crossed: false },
    { title: "Buy a keyboard", crossed: false },
    { title: "Play AAA games", crossed: false },
  ];

  const [todos, setTodos] = useState(listData);

  const onAddTodo = (todo) => {
    if (todo.title.length) {
      setTodos((prev) => [...prev, todo]);
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

  const onClearAll = () => {
    setTodos((_) => []);
  };

  return (
    <div className="card">
      <AppTitle title={appTitle} />
      <AddTodo onAddTodo={onAddTodo} />
      <TodoList todos={todos} onCrossItem={onCrossItem} />
      <Footer todos={todos} onClearAll={onClearAll} />
    </div>
  );
}

function AppTitle({ title }) {
  return <div className="title">{title}</div>;
}

function AddTodo({ onAddTodo }) {
  const [todo, setTodo] = useState("");
  return (
    <form
      className="add-todo-form"
      onSubmit={(evt) => {
        evt.preventDefault();
        onAddTodo({ title: todo, crossed: false });
        setTodo("");
      }}
    >
      <input
        placeholder="Add a todo..."
        value={todo}
        onChange={(evt) => {
          setTodo(evt.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}

function TodoList({ todos, onCrossItem }) {
  console.log(todos);
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li
          key={index}
          style={
            todo.crossed
              ? { textDecoration: "rgba(0,0,0,0.5) line-through" }
              : {}
          }
          onClick={() => onCrossItem(index)}
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

function Footer({ todos, onClearAll }) {
  const pending = todos.filter((todo) => !todo.crossed).length;
  return (
    <footer>
      <span>You have {pending} pending tasks</span>
      <button onClick={onClearAll}>Clear All</button>
    </footer>
  );
}
export default App;
