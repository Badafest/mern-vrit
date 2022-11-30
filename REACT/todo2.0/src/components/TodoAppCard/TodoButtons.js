const TodoButtons = ({ onEditClick, onDeleteClick }) => (
  <div className="todo-btn-container">
    <button onClick={onEditClick}>Edit</button>
    <button
      onClick={() => {
        if (true) {
          onDeleteClick();
        }
      }}
    >
      Delete
    </button>
  </div>
);

export default TodoButtons;
