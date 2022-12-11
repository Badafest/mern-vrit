import { forwardRef } from "react";

export default forwardRef(function UserForm(
  { type, handleSubmit },
  { usernameRef, passwordRef, emailRef }
) {
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

      {type !== "login" ? (
        <div className="mb-4">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            ref={emailRef}
          />
        </div>
      ) : (
        <></>
      )}

      {type !== "reset_password" ? (
        <div className="mb-6">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>
      ) : (
        <></>
      )}

      <button className="btn btn-primary" type="submit">
        {type === "login"
          ? "Log In"
          : type === "register"
          ? "Sign Up"
          : "Submit"}
      </button>
    </form>
  );
});
