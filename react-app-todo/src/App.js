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
  const [pending, setPending] = useState(
    todos.filter((todo) => !todo.crossed).length
  );

  const onAddTodo = (todo) => {
    if (todo.title.length) {
      setTodos((prev) => [...prev, todo]);
      setPending((prev) => prev + 1);
    }
  };

  const onCrossItem = (crossed) => {
    console.log(todos);
    setPending((prev) => (crossed ? prev - 1 : prev + 1));
  };

  const onClearAll = () => {
    setTodos((_) => []);
    setPending((_) => 0);
  };

  return (
    <div className="card">
      <AppTitle title={appTitle} />
      <AddTodo onAddTodo={onAddTodo} />
      <TodoList todos={todos} onCrossItem={onCrossItem} />
      <Footer pending={pending} onClearAll={onClearAll} />
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
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoListItem key={index} todo={todo} onCrossItem={onCrossItem} />
      ))}
    </ul>
  );
}

function TodoListItem({ todo, onCrossItem }) {
  const [crossed, setCrossed] = useState(todo.crossed);
  return (
    <li
      style={crossed ? { textDecoration: "rgba(0,0,0,0.5) line-through" } : {}}
      onClick={() => {
        todo.crossed = !crossed; // Is it good practice? If not, what is alternative?
        onCrossItem(!crossed);
        setCrossed((prev) => !prev);
      }}
    >
      {todo.title}
    </li>
  );
}

function Footer({ pending, onClearAll }) {
  return (
    <footer>
      <span>You have {pending} pending tasks</span>
      <button onClick={onClearAll}>Clear All</button>
    </footer>
  );
}
export default App;
