import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const registerFormRef = useRef<HTMLFormElement>(null);

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    if (registerFormRef.current) {
      const data = new FormData(registerFormRef.current);
      const name = "@" + data.get("username");
      const password = data.get("password");
      console.log(name, password);
    }
  };
  return (
    <div className="flex h-screen bg-gray-600 justify-center items-center">
      <form
        className="flex flex-col gap-2 bg-gray-700 p-4 rounded"
        onSubmit={handleRegister}
        ref={registerFormRef}
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
          Register
        </button>
        <Link to="/login" className="px-4 mt-4 text-white text-center">
          Log in with existing account.
        </Link>
      </form>
    </div>
  );
}
