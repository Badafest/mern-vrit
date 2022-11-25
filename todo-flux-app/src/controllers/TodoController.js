import { TodoActions } from "../action/TodoAction";

const toggleTodoCompleted = (state, index) => {
  return state.map((item, idx) =>
    idx === index ? { ...item, completed: !item.completed } : item
  );
};

export const TodoController = (state, action) => {
  switch (action.type) {
    case TodoActions.ADD:
      return action.payload;
    case TodoActions.COMPLETED:
      return toggleTodoCompleted(state, action.payload);
  }
};
