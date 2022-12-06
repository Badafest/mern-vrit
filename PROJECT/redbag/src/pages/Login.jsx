import { Link } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import LoginImg from "../imgs/login.svg";

export default function () {
  return (
    <>
      <div className="w-full mx-auto max-w-sm flex-grow">
        <UserForm type="login" />
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
