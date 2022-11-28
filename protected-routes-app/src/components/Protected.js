import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Protected() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    user || navigate("/login");
  });

  return user ? <Outlet /> : <></>;
}
