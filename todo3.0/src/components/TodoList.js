import DeleteConfirm from "./DeleteConfirm";
import AddOrEditForm from "./AddOrEditForm";
import Todos from "./Todos";
import { useState } from "react";
import useDispatch from "../hooks/useDispatch";
import { IconButton } from "./Elements";

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
      <IconButton text="Add Todo" onClick={onAddBtnClick} />
      <Todos handleDelete={onDeleteBtnClick} handleEdit={onEditBtnClick} />
    </div>
  );
};

export default TodoList;
