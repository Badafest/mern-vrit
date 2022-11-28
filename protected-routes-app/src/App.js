import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h3 className="m-4">Hello! Please click a button to start...</h3>
      <div className="d-flex col-md-4 offset-md-4 justify-content-between">
        <Link to="/login">
          <Button variatn="primary">Log In</Button>
        </Link>
        <Link to="/register">
          <Button variant="success">Register</Button>
        </Link>
        <Link to="/app">
          <Button variant="outline-danger">Go to App</Button>
        </Link>
      </div>
    </div>
  );
}

export default App;
