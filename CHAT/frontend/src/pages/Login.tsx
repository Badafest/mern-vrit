import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import UserForm from "../components/UserForm";

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
      <UserForm
        handleFormSubmit={handleLogin}
        submitText="Log In"
        ref={loginFormRef}
      >
        <Link to="/register" className="px-4 mt-4 text-white text-center">
          Create a free account today.
        </Link>
        <Link to="/forgotPassword" className="px-4 text-white text-center">
          Forgot your Password?
        </Link>
      </UserForm>
    </div>
  );
}
