const DeleteConfirm = function ({
  showConfirm,
  formHandler,
  closeDeleteConfirm,
}) {
  const deleteConfirmFunction = (event) => {
    event.preventDefault();
    formHandler();
    closeDeleteConfirm();
  };

  return showConfirm ? (
    <form onSubmit={deleteConfirmFunction}>
      <h3>Are you sure?</h3>
      <p>You can't recover the todo once deleted.</p>
      <div className="btn-container">
        <button type="button" onClick={closeDeleteConfirm}>
          Close
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  ) : null;
};

export default DeleteConfirm;
