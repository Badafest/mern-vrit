import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import UserController from "../../controllers/UserController";

import Login from "../../pages/Login";

export default function AdminProvider() {
  const { user } = useContext(UserContext);
  const [role, setRole] = useState("");

  useEffect(() => {
    UserController.getUserData().then((data) => setRole(data.role));
  }, []);

  return user && user._id && user.username && role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Login />
  );
}
