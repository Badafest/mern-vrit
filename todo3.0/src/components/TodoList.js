import ConfirmDelete from "./ConfirmDelete";
import TodoForm from "./TodoForm";
import Todos from "./Todos";
import { TodoActions } from "../actions/TodoActions";
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoList = () => {
  const [_, dispatch] = useContext(TodoContext);

  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formHandler, setFormHandler] = useState(() => () => {});

  const handleAddTodo = (title) =>
    dispatch({ type: TodoActions.ADD, payload: title });

  const handleEditTodo = (title, todo) =>
    dispatch({ type: TodoActions.EDIT, payload: { ...todo, title } });

  const handleDeleteTodo = (title, todo) =>
    dispatch({ type: TodoActions.DELETE, payload: todo.id });

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
      <button onClick={onAddBtnClick}>Add Todo</button>
      <Todos handleDelete={onDeleteBtnClick} handleEdit={onEditBtnClick} />
    </div>
  );
};

export default TodoList;
