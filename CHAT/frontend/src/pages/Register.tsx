import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";
import UserForm from "../components/UserForm";
import axios from "../config/axios";

export default function Register() {
  const registerFormRef = useRef<HTMLFormElement>(null);

  const [toast, setToast] = useState<{
    message: string;
    type?: "danger" | "success" | "basic";
    body?: string;
  }>({ message: "" });

  const onToastClose = () => {
    setToast((_) => ({ message: "" }));
  };

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    if (registerFormRef.current) {
      const formData = new FormData(registerFormRef.current);
      const name = "@" + formData.get("username");
      const password = formData.get("password");
      try {
        const { data } = await axios.post("/user", { name, password });
        setToast((_) => ({
          message: data.message,
          type: "success",
          body: "You can now proceed to login :)",
        }));
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
