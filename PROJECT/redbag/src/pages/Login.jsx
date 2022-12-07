import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import Toast from "../components/Toast";
import { UserContext } from "../context/user.context";
import AuthController from "../controllers/AuthController";
import LoginImg from "../imgs/login.svg";

export default function () {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [toast, setToast] = useState({ message: "", type: "" });
  const handleToastClose = () => {
    setToast({ message: "", type: "" });
  };

  const { changeUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (evt) => {
    evt.preventDefault();
    const data = await AuthController.login(
      usernameRef.current.value,
      passwordRef.current.value
    );
    if (data.user && data.access_token && data.refresh_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      changeUser(data.user);
      navigate("/dashboard");
    } else {
      setToast({ message: data, type: "error" });
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
          type="login"
          handleSubmit={handleLogin}
          ref={{ usernameRef, passwordRef }}
        />
        <Link
          to="/register"
          className="block link text-center text-gray-800 text-s"
        >
          Don't have an account yet? Create one now!
        </Link>
        <Link
          to="/reset_password"
          className="block link text-center text-gray-800 text-s"
        >
          Forgot your password? Reset it here.
        </Link>
      </div>
      <img src={LoginImg} className="w-0 h-fit md:w-1/3" />
    </>
  );
}
