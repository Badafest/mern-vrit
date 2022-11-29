import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../slices/userSlice";

export default function Navbar({ user }) {
  const dispatch = useDispatch();
  return (
    <nav className="nav-bar">
      <div className="brand-title">Todo App</div>
      <div className="nav-list">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {user.length > 0 ? (
          <>
            <span
              onClick={() => dispatch(logout())}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Logout
            </span>
            <Link to="/app" className="nav-link">
              {user}
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
