import { useRef } from "react";

import { LabeledInput, Modal } from "./Elements";

const TodoForm = ({ onConfirm, closeModal }) => {
  const ModalTitle = "Todo Form";
  const titleRef = useRef();
  return (
    <Modal
      title={ModalTitle}
      onConfirm={() => {
        const titleValue = titleRef.current.value;
        titleValue.length && onConfirm(titleValue);
      }}
      closeModal={closeModal}
    >
      <LabeledInput id="title" label="Title" ref={titleRef} />
    </Modal>
  );
};

export default TodoForm;
