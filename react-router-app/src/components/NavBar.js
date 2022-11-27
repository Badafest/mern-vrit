import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <span className="app_name">Todo App</span>
      <nav>
        <Link to="/" className="nav_link">
          <span>Home</span>
        </Link>
        <Link to="/contact" className="nav_link">
          <span>Contact</span>
        </Link>
        <Link to="/todos" className="nav_link">
          <span>Todos</span>
        </Link>
      </nav>
      <button>LOG IN</button>
    </header>
  );
};

export default NavBar;
