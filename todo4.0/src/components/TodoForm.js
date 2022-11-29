import { forwardRef } from "react";

export default forwardRef(function TodoForm(_, ref) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="container-child">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Type a short title"
          ref={ref}
        />
      </div>
    </form>
  );
});
