import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import UserForm from "../components/UserForm";
import axios from "../config/axios";

export default function Login() {
  const loginFormRef = useRef<HTMLFormElement>(null);

  const [toast, setToast] = useState<{
    message: string;
    type?: "danger" | "success" | "basic";
    body?: string;
  }>({ message: "" });

  const onToastClose = () => {
    setToast((_) => ({ message: "" }));
  };

  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (loginFormRef.current) {
      const data = new FormData(loginFormRef.current);
      const name = "@" + data.get("username");
      const password = data.get("password");
      try {
        const { data } = await axios.post("/user/login", { name, password });
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        navigate("/app");
      } catch (error: any) {
        const { data } = error.response;
        setToast((_) => ({
          message: data.message,
          type: "danger",
          body: data.error,
        }));
      }
    }
  };
  return (
    <div className="flex flex-col gap-4 h-screen bg-gray-600 justify-center items-center">
      {toast.message.length ? (
        <Toast message={toast.message} type={toast.type} onClose={onToastClose}>
          {toast.body}
        </Toast>
      ) : (
        <></>
      )}
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
