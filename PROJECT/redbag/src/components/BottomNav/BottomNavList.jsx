import { useContext } from "react";
import { Link } from "react-router-dom";
import LINKS from "../../config/LINKS";
import { UserContext } from "../../context/user.context";

export default function BottomNavList() {
  const { user } = useContext(UserContext);
  return LINKS(user).map((link, index) => (
    <Link to={link.to} key={index} className="link text-center m-1">
      <div className="icon bg-primary text-light">{link.icon}</div>
      <div className="text-xs text-gray-500">{link.name}</div>
    </Link>
  ));
}
