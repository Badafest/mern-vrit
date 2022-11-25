import { Modal } from "./Elements";

const ConfirmDelete = ({ onConfirm, closeModal }) => (
  <Modal
    title="Are you sure you?"
    description="This todo can't be recovered once deleted!"
    onConfirm={onConfirm}
    closeModal={closeModal}
  />
);

export default ConfirmDelete;
