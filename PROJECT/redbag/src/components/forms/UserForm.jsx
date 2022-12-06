export default function UserForm({
  type,
  handleSubmit,
  usernameRef,
  passwordRef,
}) {
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          ref={usernameRef}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        {type === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
}
