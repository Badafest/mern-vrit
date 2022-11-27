import { useContext } from "react";
import { TodoActions } from "../../actions/TodoActions";
import { TodoContext } from "../../context/TodoContext";

const TodoTitle = ({ todo }) => {
  const [_, dispatch] = useContext(TodoContext);

  const handleStrike = () => {
    dispatch({ type: TodoActions.STRIKE, payload: todo.id });
  };

  const STRIKE_STYLE = {
    true: { textDecoration: "line-through" },
    false: {},
  };

  return (
    <div className="todo-item-title" onClick={handleStrike}>
      <span
        className="todo-title"
        style={STRIKE_STYLE[todo.completed]}
      >{`${todo.id}. ${todo.title}`}</span>
      <span className="todo-author">{`user ${todo.userId}`}</span>
    </div>
  );
};

export default TodoTitle;
