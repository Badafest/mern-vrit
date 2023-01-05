import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

export default function Protected() {
  const isLoggedIn = false;
  return <>{isLoggedIn ? <Outlet /> : <Login />}</>;
}
