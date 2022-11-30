import { useRef } from "react";
import { Modal, LabeledInput } from "./Elements";

const AddOrEditForm = function ({ showForm, formHandler, closeAddEditForm }) {
  const titleRef = useRef();

  const onConfirmFunction = () => {
    const titleValue = titleRef.current.value;
    if (titleValue.length) {
      formHandler(titleValue);
      closeAddEditForm();
    }
  };

  return showForm ? (
    <Modal
      title="Todo Form"
      onConfirm={onConfirmFunction}
      closeModal={closeAddEditForm}
    >
      <LabeledInput id="title" label="Title" ref={titleRef} />
    </Modal>
  ) : null;
};

export default AddOrEditForm;
