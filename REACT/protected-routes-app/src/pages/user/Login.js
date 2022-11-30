import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";
import { UserContext } from "../../context/UserContext";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const { loginUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser(user);
    navigate("/app");
  };

  return (
    <div className="col col-md-4 container mt-4">
      <UserForm
        user={user}
        handleChange={handleChange}
        handleSubmit={handleLogin}
        btnTxt="Login"
      />
      <div className="text-center mt-4">
        <Link className="text-decoration-none" to="/register">
          Don't have an account yet? Register here.
        </Link>
      </div>
    </div>
  );
}

export default Login;
