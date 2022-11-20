import Todo from "./Todo";

const TodoList = ({ todos, onCrossItem, onEditItem, onDeleteItem }) => {
  return (
    <ul className="todo-list">
      {todos.map((item, index) => (
        <li
          key={index}
          onClick={(event) => {
            if (event.target.tagName !== "BUTTON") {
              onCrossItem(index);
            }
          }}
          className={item.crossed ? "crossed" : ""}
        >
          <Todo
            todo={item}
            index={index}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
