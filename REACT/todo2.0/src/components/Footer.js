const TodoFooter = ({ todos, onClearAll }) => {
  const pending = todos.filter((todo) => !todo.crossed).length;

  return (
    <footer>
      <span>{`You have ${pending ? pending : "no"} pending ${
        pending > 1 ? "tasks" : "task"
      }.`}</span>
      <button onClick={onClearAll}>Delete All</button>
    </footer>
  );
};

export default TodoFooter;
