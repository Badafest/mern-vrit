import TodoTitle from "./TodoTitle";

const TodoItem = ({ todo, ...rest }) => {
  return (
    <div
      className={todo.completed ? "todo-item striked" : "todo-item"}
      {...rest}
    >
      <TodoTitle id={todo.id} title={todo.title} userId={todo.userId} />
    </div>
  );
};

export default TodoItem;
