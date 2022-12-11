import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/user.context";

import Login from "../pages/Login";

export default function PrivateProvider() {
  const { user } = useContext(UserContext);
  return user && user._id && user.username ? <Outlet /> : <Login />;
}
