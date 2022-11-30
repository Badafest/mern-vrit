import "./App.css";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <h3>Hello</h3>
      <LoginForm correctUsername="admin" correctPassword="admin" />
    </div>
  );
}

export default App;
