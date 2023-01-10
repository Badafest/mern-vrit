import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/User";
import Login from "../pages/Login";

export default function Protected() {
  const { user } = useContext(UserContext);
  const isLoggedIn = user && user.name && user.name.length;
  return <>{isLoggedIn ? <Outlet /> : <Login />}</>;
}
