import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

function Main() {
  const { username } = useSelector((state) => state.user.current);
  return (
    <>
      <Navbar user={username} />
      <Outlet />
    </>
  );
}

export default Main;
