import { useContext } from "react";
import { Link } from "react-router-dom";
import LINKS from "../../config/LINKS";
import { UserContext } from "../../context/user.context";

export default function NavList() {
  const { user } = useContext(UserContext);
  return LINKS(user).map((link, index) => (
    <Link to={link.to} key={index} className={link.classes || "link"}>
      {link.name}
    </Link>
  ));
}
