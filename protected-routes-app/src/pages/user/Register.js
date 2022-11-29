import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";
import { UserContext } from "../../context/UserContext";

function Register() {
  const [user, setUser] = useState({ username: "", password: "" });
  const { registerUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    registerUser(user);
    navigate("/login");
  };

  return (
    <div className="col col-md-4 container mt-4">
      <UserForm
        user={user}
        handleChange={handleChange}
        handleSubmit={handleRegister}
        btnTxt="Register"
      />
      <div className="text-center mt-4">
        <Link className="text-decoration-none" to="/login">
          Already have an account? Login here.
        </Link>
      </div>
    </div>
  );
}

export default Register;
