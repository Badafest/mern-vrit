const TodoButons = ({ handleDelete, handleEdit }) => {
  return (
    <div className="btn-container">
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoButons;
