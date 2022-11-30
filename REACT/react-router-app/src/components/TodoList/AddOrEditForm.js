import { useRef } from "react";

const AddOrEditForm = function ({ showForm, formHandler, closeAddEditForm }) {
  const titleRef = useRef();

  const onConfirmFunction = (event) => {
    event.preventDefault();
    const titleValue = titleRef.current.value;
    if (titleValue.length) {
      formHandler(titleValue);
      closeAddEditForm();
    }
  };

  return showForm ? (
    <form onSubmit={onConfirmFunction}>
      <label for="title">Title of Todo</label>
      <input name="title" id="title" ref={titleRef} />
      <div className="btn-container">
        <button type="button" onClick={closeAddEditForm}>
          Close
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  ) : null;
};

export default AddOrEditForm;
