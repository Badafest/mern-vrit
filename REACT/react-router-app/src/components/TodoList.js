import DeleteConfirm from "./TodoList/DeleteConfirm";
import AddOrEditForm from "./TodoList/AddOrEditForm";
import Todos from "./TodoList/Todos";
import { useState } from "react";
import useDispatch from "../hooks/useDispatch";

const TodoList = () => {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formHandler, setFormHandler] = useState(() => () => {});

  const { handleAddTodo, handleEditTodo, handleDeleteTodo } = useDispatch();

  const onAddBtnClick = () => {
    setFormHandler(() => handleAddTodo);
    setShowForm(true);
  };

  const onEditBtnClick = (todo) => {
    setFormHandler(() => (title) => handleEditTodo(title, todo));
    setShowForm(true);
  };

  const onDeleteBtnClick = (todo) => {
    setFormHandler(() => () => handleDeleteTodo(todo.id));
    setShowConfirm(true);
  };

  const closeAddEditForm = () => {
    setShowForm(false);
  };

  const closeDeleteConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div className="todo-list-main">
      <AddOrEditForm
        showForm={showForm}
        formHandler={formHandler}
        closeAddEditForm={closeAddEditForm}
      />
      <DeleteConfirm
        showConfirm={showConfirm}
        formHandler={formHandler}
        closeDeleteConfirm={closeDeleteConfirm}
      />
      <button onClick={onAddBtnClick}>Add Todo</button>
      <Todos handleDelete={onDeleteBtnClick} handleEdit={onEditBtnClick} />
    </div>
  );
};

export default TodoList;
