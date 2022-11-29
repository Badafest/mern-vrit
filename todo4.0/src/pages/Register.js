import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { register } from "../slices/userSlice";
import { useRef, useState } from "react";

export default function Register() {
  const [message, setMessage] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    try {
      const user = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(register(user));
      navigate("/login");
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
      <form onSubmit={handleRegister}>
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
            Register
          </button>
          <Link to="/login" className="link">
            Already have an account? Login here.
          </Link>
        </div>
      </form>
    </div>
  );
}
