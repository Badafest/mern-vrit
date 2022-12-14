import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import Toast from "../components/Toast";
import AuthController from "../controllers/AuthController";
import LoginImg from "../imgs/login.svg";

export default function () {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const [toast, setToast] = useState({ message: "", type: "" });
  const handleToastClose = () => {
    setToast({ message: "", type: "" });
  };

  const navigate = useNavigate();

  const handleRegister = async (evt) => {
    evt.preventDefault();
    try {
      await AuthController.register(
        usernameRef.current.value,
        passwordRef.current.value,
        emailRef.current.value
      );
      navigate("/login");
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
          type="register"
          handleSubmit={handleRegister}
          ref={{ usernameRef, passwordRef, emailRef }}
        />
        <Link
          to="/login"
          className="block link text-center text-gray-800 text-s"
        >
          Already have an account? Log in here
        </Link>
      </div>
      <img src={LoginImg} className="w-0 h-fit md:w-1/3" />
    </>
  );
}
