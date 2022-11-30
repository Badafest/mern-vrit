import { useRef, useState } from "react";
import { Input } from "../elements";

const AddTodo = ({
  onAddTodo,
  isEdit = false,
  emptyTodo = {
    title: "",
    subtitle: "",
    crossed: false,
    meta: { "🖊": "", "🕒": "" },
  },
}) => {
  const [todo, setTodo] = useState(emptyTodo);

  const addTodoFormRef = useRef();

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const newTodo = {
      ...todo,
      meta: {
        "🖊": todo.meta["🖊"] || "anonymous",
        "🕒": new Date().getTime(),
      },
    };
    onAddTodo(newTodo);
    setTodo(emptyTodo);
  };

  const onInputChange = (event) => {
    const formData = new FormData(addTodoFormRef.current);
    setTodo((prev) => ({
      ...prev,
      [event.target.name]: formData.get(event.target.name),
    }));
  };

  const onMetaChange = (event) => {
    const formData = new FormData(addTodoFormRef.current);
    setTodo((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        [event.target.name]: formData.get(event.target.name),
      },
    }));
  };

  return (
    <form
      className="add-todo-form"
      onSubmit={onFormSubmit}
      ref={addTodoFormRef}
    >
      <div className="input-row">
        <Input
          label="Title"
          placeholder="Add a todo..."
          onChange={onInputChange}
          name="title"
          value={todo.title}
          required
        />{" "}
        <Input
          label="Author"
          placeholder="What do you like to be called?"
          onChange={onMetaChange}
          name="🖊"
          value={todo.meta["🖊"]}
        />
      </div>
      <div className="input-row">
        <Input
          label="Description"
          placeholder="A short and sweet description..."
          onChange={onInputChange}
          name="subtitle"
          value={todo.subtitle}
        />
        <button type="submit">{isEdit ? "Edit Todo" : "Add Todo"}</button>
      </div>
    </form>
  );
};

export default AddTodo;
