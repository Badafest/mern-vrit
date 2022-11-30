import { TodoActions } from "../actions/TodoActions";

const onAddTodo = (todos, title) => [
  {
    id: todos.length + 1,
    userId: 201,
    title: title,
    completed: false,
  },
  ...todos,
];

const onEditTodo = (todo, todos) =>
  todos.map((item) => (item.id === todo.id ? todo : item));

const onDeleteTodo = (id, todos) => todos.filter((item) => item.id !== id);

const onStrikeTodo = (id, todos) =>
  todos.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item
  );

export const TodoController = (state, action) => {
  switch (action.type) {
    case TodoActions.FETCH:
      return action.payload;
    case TodoActions.ADD:
      return onAddTodo(state, action.payload);
    case TodoActions.EDIT:
      return onEditTodo(action.payload, state);
    case TodoActions.DELETE:
      return onDeleteTodo(action.payload, state);
    case TodoActions.STRIKE:
      return onStrikeTodo(action.payload, state);
  }
};
