import { useDispatch } from "react-redux";
import { remove } from "../../../slices/todoSlice";

import Modal from "../../../components/Modal";

export default function DeleteTodo({ show, onClose, id }) {
  const dispatch = useDispatch();

  const onConfirm = () => {
    dispatch(remove(id));
    onClose();
  };

  return (
    <>
      {show ? (
        <Modal title="Delete Todo" onClose={onClose} onConfirm={onConfirm}>
          <div className="list-item">
            Once deleted, a todo can never be recovered!
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
