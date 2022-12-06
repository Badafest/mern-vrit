import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import userService from "../features/user/userService";
import LoginImg from "../imgs/login.svg";

export default function () {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const UserService = new userService(user, dispatch);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleRegister = (evt) => {
    evt.preventDefault();
    UserService.register(usernameRef.current.value, passwordRef.current.value);
  };
  return (
    <>
      <div className="w-full mx-auto max-w-sm flex-grow">
        <UserForm
          type="register"
          handleSubmit={handleRegister}
          usernameRef={usernameRef}
          passwordRef={passwordRef}
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
