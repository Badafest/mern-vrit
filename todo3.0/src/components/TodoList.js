import ConfirmDelete from "./ConfirmDelete";
import TodoForm from "./TodoForm";
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
    setFormHandler((prev) => handleAddTodo);
    setShowForm(true);
  };

  const onEditBtnClick = (todo) => {
    setFormHandler((prev) => (title) => handleEditTodo(title, todo));
    setShowForm(true);
  };

  const onDeleteBtnClick = (todo) => {
    setFormHandler((prev) => (title) => handleDeleteTodo(title, todo));
    setShowConfirm(true);
  };

  const AddOrEditForm = () => {
    const addEditConfirmFunction = (title) => {
      formHandler(title);
      setShowForm(false);
    };

    return showForm ? (
      <TodoForm
        onConfirm={addEditConfirmFunction}
        closeModal={() => setShowForm(false)}
      />
    ) : null;
  };

  const DeleteConfirm = () => {
    const deleteConfirmFunction = (title) => {
      formHandler(title);
      setShowConfirm(false);
    };

    return showConfirm ? (
      <ConfirmDelete
        onConfirm={deleteConfirmFunction}
        closeModal={() => setShowConfirm(false)}
      />
    ) : null;
  };

  return (
    <div className="todo-list-main">
      {AddOrEditForm()}
      {DeleteConfirm()}
      <IconButton text="Add Todo" onClick={onAddBtnClick} />
      <Todos handleDelete={onDeleteBtnClick} handleEdit={onEditBtnClick} />
    </div>
  );
};

export default TodoList;
