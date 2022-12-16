import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import Toast from "../components/Toast";
import AuthController from "../controllers/AuthController";
import LoginImg from "../imgs/login.svg";

export default function ForgotPassword() {
  const usernameRef = useRef();
  const emailRef = useRef();

  const [toast, setToast] = useState({ message: "", type: "" });
  const handleToastClose = () => {
    setToast({ message: "", type: "" });
  };

  const handleForgotPassword = async (evt) => {
    evt.preventDefault();
    try {
      const { message } = await AuthController.forgotPassword(
        usernameRef.current.value,
        emailRef.current.value
      );
      setToast({ message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  return (
    <>
      <div className="w-full mx-auto max-w-sm flex-grow">
        {toast.message.length ? (
          <Toast {...toast} onClose={handleToastClose} />
        ) : (
          <></>
        )}
        <UserForm
          type="reset_password"
          handleSubmit={handleForgotPassword}
          ref={{ usernameRef, emailRef }}
        />
        <Link
          to="/login"
          className="block link text-center text-gray-800 text-s"
        >
          Login instead? Click here
        </Link>
      </div>
      <img src={LoginImg} className="w-0 h-fit md:w-1/3" />
    </>
  );
}
