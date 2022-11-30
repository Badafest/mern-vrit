import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../../slices/todoSlice";

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function App() {
  const dispatch = useDispatch();

  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const onCloseAddModal = () => {
    setAddModal(false);
  };

  return (
    <>
      <AddTodo show={addModal} onClose={onCloseAddModal} />
      <div className="container">
        <div className="container-child">
          <button
            style={{ margin: "0.5em 1em" }}
            onClick={() => {
              setAddModal(true);
            }}
          >
            Add Todo
          </button>
          <TodoList />
        </div>
      </div>
    </>
  );
}
