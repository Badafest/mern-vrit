import { useDispatch } from "react-redux";
import { strike } from "../../../slices/todoSlice";

export default function TodoTitle({ todo }) {
  const dispatch = useDispatch();
  return (
    <span
      className="list-title"
      onClick={() => {
        dispatch(strike(todo.id));
      }}
      style={{ textDecoration: todo.completed ? "line-through" : "" }}
    >
      {`${todo.id}. ${todo.title}`}
    </span>
  );
}
