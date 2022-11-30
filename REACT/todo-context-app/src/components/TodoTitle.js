const TodoTitle = ({ id, title, userId }) => {
  return (
    <div className="todo-title">
      <span className="todo-title-text">{id + ". " + title}</span>
      <span className="todo-author">{`user ${userId}`}</span>
    </div>
  );
};

export default TodoTitle;
