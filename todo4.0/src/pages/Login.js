import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../slices/userSlice";
import { useRef, useState } from "react";

export default function Login() {
  const [message, setMessage] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = (event) => {
    try {
      event.preventDefault();
      const user = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(login(user));
      navigate("/app");
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div className="container">
      {message.length > 0 ? (
        <div className="error-message">{message}</div>
      ) : (
        <></>
      )}
      <form onSubmit={handleLogin}>
        <div className="container-child">
          <label htmlFor="username">Username</label>
          <input name="username" id="username" type="text" ref={usernameRef} />
        </div>
        <div className="container-child">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            ref={passwordRef}
          />
        </div>
        <div className="container-child">
          <button type="submit" className="success-btn">
            Login
          </button>
          <Link to="/register" className="link">
            Don't have an account yet? Register here.
          </Link>
        </div>
      </form>
    </div>
  );
}
