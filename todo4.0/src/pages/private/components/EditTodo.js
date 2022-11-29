import { useRef } from "react";
import { useDispatch } from "react-redux";
import { edit } from "../../../slices/todoSlice";

import Modal from "../../../components/Modal";
import TodoForm from "../../../components/TodoForm";

export default function EditTodo({ show, onClose, todo }) {
  const titleRef = useRef(todo.title);

  const dispatch = useDispatch();

  const onConfirm = () => {
    const newTitle = titleRef.current.value;
    if (newTitle.length) {
      dispatch(edit({ id: todo.id, title: newTitle }));
      onClose();
    } else {
      throw "Title is required";
    }
  };

  return (
    <>
      {show ? (
        <Modal title="Edit Todo" onClose={onClose} onConfirm={onConfirm}>
          <TodoForm ref={titleRef} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
