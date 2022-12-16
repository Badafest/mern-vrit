import { useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import AuthController from "../controllers/AuthController";
import LoginImg from "../imgs/login.svg";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const secret = searchParams.get("secret");
  const passwordRef = useRef();

  const [toast, setToast] = useState({ message: "", type: "" });
  const handleToastClose = () => {
    setToast({ message: "", type: "" });
  };

  const navigate = useNavigate();

  const handleResetPassword = async (evt) => {
    evt.preventDefault();
    try {
      await AuthController.resetPassword(secret, passwordRef.current.value);
      navigate("/login");
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  return (
    <>
      <div className="w-full mx-auto max-w-sm ">
        {toast.message.length ? (
          <Toast {...toast} onClose={handleToastClose} />
        ) : (
          <></>
        )}

        <div className="flex flex-col gap-2 bg-white p-2 rounded-md shadow-md">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            required
            placeholder="Enter a strong password"
          />
          <button
            className="btn btn-primary w-full mt-6"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </div>
      </div>
      <img src={LoginImg} className="w-0 h-fit md:w-1/3" />
    </>
  );
}
