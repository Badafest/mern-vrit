import { useRef } from "react";
import { useDispatch } from "react-redux";
import { add } from "../../../slices/todoSlice";

import Modal from "../../../components/Modal";
import TodoForm from "../../../components/TodoForm";

export default function AddTodo({ show, onClose }) {
  const titleRef = useRef();

  const dispatch = useDispatch();

  const onConfirm = () => {
    const newTitle = titleRef.current.value;
    if (newTitle.length) {
      dispatch(add(newTitle));
      onClose();
    } else {
      throw "Title is required";
    }
  };

  return (
    <div className="container">
      {show ? (
        <Modal title="Add Todo" onClose={onClose} onConfirm={onConfirm}>
          <TodoForm ref={titleRef} />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
