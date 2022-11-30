import { useState } from "react";
import { TodoDisplay } from "../elements";
import AddTodo from "./AddTodo";
import TodoButtons from "./TodoButtons";

const Todo = ({ todo, index, onEditItem, onDeleteItem }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <TodoDisplay todo={todo} />

      <TodoButtons
        onEditClick={() => {
          setShowEditForm((prev) => !prev);
        }}
        onDeleteClick={() => onDeleteItem(index)}
      />

      {showEditForm ? (
        <AddTodo
          onAddTodo={(todo) => {
            onEditItem(todo, index);
            setShowEditForm((prev) => !prev);
          }}
          isEdit={true}
          emptyTodo={todo}
        />
      ) : null}
    </>
  );
};

export default Todo;
