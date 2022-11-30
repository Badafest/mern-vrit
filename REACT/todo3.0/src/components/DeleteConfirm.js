import { Modal } from "./Elements";

const DeleteConfirm = function ({
  showConfirm,
  formHandler,
  closeDeleteConfirm,
}) {
  const deleteConfirmFunction = (title) => {
    formHandler(title);
    closeDeleteConfirm();
  };

  return showConfirm ? (
    <Modal
      title="Are you sure you?"
      description="This todo can't be recovered once deleted!"
      onConfirm={deleteConfirmFunction}
      closeModal={closeDeleteConfirm}
    />
  ) : null;
};

export default DeleteConfirm;
