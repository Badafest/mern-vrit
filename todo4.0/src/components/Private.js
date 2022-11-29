import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Private() {
  const { username, password } = useSelector((state) => state.user.current);

  return (
    <>
      {username.length && password.length ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
