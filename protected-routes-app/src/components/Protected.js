import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Protected() {
  const { user } = useContext(UserContext);

  return user?.username && user?.password ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
