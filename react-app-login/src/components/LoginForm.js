import { useEffect, useRef, useState } from "react";
import ToastMessage from "../components/Toast";

function LoginForm(props) {
  const { correctUsername, correctPassword } = props;
  const [toast, setToast] = useState("");

  //just trying out uncontrolled inputs
  const username = useRef();
  const password = useRef();

  //to clear toast message after 5s
  const clearToast = () => {
    setToast("");
  };

  /*could simpy set toast to "Please login to continue..."
  but trying out useEffect with empty dependency array*/
  useEffect(() => {
    setToast("Please login to continue...");
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (username.current.value.length && password.current.value.length) {
      if (
        username.current.value === correctUsername &&
        password.current.value === correctPassword
      ) {
        setToast("Congratulations! You are now logged in.");
      } else {
        setToast("Sorry, but couldn't log you in.");
      }
    } else {
      setToast("Username and Password can't be empty!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="johndoe123"
            ref={username}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            ref={password}
          />
        </div>
        <div className="btn-container">
          <button type="reset">Clear</button>
          <button type="submit">Login</button>
        </div>
      </form>
      {toast.length ? (
        <ToastMessage message={toast} clearToast={clearToast} />
      ) : (
        <></>
      )}
    </>
  );
}

export default LoginForm;
