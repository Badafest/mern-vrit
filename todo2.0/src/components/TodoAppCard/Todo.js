import { useState } from "react";
import { TimeAgo } from "../elements";
import AddTodo from "./AddTodo";
import TodoButtons from "./TodoButtons";

const Todo = ({ todo, index, onEditItem, onDeleteItem }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <div className="item-title">{todo.title}</div>
      {todo.subtitle ? (
        <div className="item-subtitle">{todo.subtitle}</div>
      ) : null}
      {todo.meta ? (
        <div className="item-meta">
          {Object.keys(todo.meta).map((metaKey, index) =>
            metaKey === "🕒" ? (
              <TimeAgo key={index} thenTime={todo.meta["🕒"]} />
            ) : (
              <span
                key={index}
                className="meta-tag"
              >{`${metaKey} ${todo.meta[metaKey]}`}</span>
            )
          )}
        </div>
      ) : null}
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
