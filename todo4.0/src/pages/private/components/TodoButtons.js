import { useState } from "react";

import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

export default function TodoButtons({ todo }) {
  const [editTodo, setEditTodo] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(false);

  const handleEditClick = () => {
    setEditTodo(true);
  };

  const handleDeleteClick = () => {
    setDeleteTodo(true);
  };

  return (
    <>
      <EditTodo
        show={editTodo}
        onClose={() => setEditTodo(false)}
        todo={todo}
      />
      <DeleteTodo
        show={deleteTodo}
        onClose={() => setDeleteTodo(false)}
        id={todo.id}
      />
      <span className="list-buttons">
        <button onClick={handleEditClick}>Edit</button>
        <button className="danger-btn" onClick={handleDeleteClick}>
          Delete
        </button>
      </span>
    </>
  );
}
