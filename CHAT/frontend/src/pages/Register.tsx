import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import UserForm from "../components/UserForm";
import axios from "../config/axios";

export default function Register() {
  const registerFormRef = useRef<HTMLFormElement>(null);

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    if (registerFormRef.current) {
      const formData = new FormData(registerFormRef.current);
      const name = "@" + formData.get("username");
      const password = formData.get("password");
      const { data } = await axios.post("/user", { name, password });
      console.log(data);
    }
  };

  return (
    <div className="flex h-screen bg-gray-600 justify-center items-center">
      <UserForm
        handleFormSubmit={handleRegister}
        submitText="Register"
        ref={registerFormRef}
      >
        <Link className="px-4 mt-4 text-white text-center" to="/login">
          Login with your existing account
        </Link>
      </UserForm>
    </div>
  );
}
