import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const loginFormRef = useRef<HTMLFormElement>(null);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (loginFormRef.current) {
      const data = new FormData(loginFormRef.current);
      const name = "@" + data.get("username");
      const password = data.get("password");
      console.log(name, password);
    }
  };
  return (
    <div className="flex h-screen bg-gray-600 justify-center items-center">
      <form
        className="flex flex-col gap-2 bg-gray-700 p-4 rounded"
        onSubmit={handleLogin}
        ref={loginFormRef}
      >
        <div className="flex flex-col text-white">
          <label htmlFor="username">Username</label>
          <input
            className="px-4 py-2 outline-none rounded text-gray-700"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="flex flex-col text-white">
          <label htmlFor="password">Password</label>
          <input
            className="px-4 py-2 outline-none rounded text-gray-700"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button className="mt-4 bg-gray-300 hover:bg-white active:bg-gray-400 rounded py-2 shadow-md">
          Log In
        </button>
        <Link to="/register" className="px-4 mt-4 text-white text-center">
          Create a free account today.
        </Link>
        <Link to="/forgotPassword" className="px-4 text-white text-center">
          Forgot your Password?
        </Link>
      </form>
    </div>
  );
}
