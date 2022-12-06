import { Link } from "react-router-dom";

export default function NavList() {
  const LINKS = [
    {
      title: "Products",
      to: "/products",
      classes: "btn btn-primary",
    },
    {
      title: "Vendors",
      to: "/vendors",
      classes: "btn btn-primary",
    },
    {
      title: "Help",
      to: "/help",
    },
    {
      title: "Contact",
      to: "/contact",
    },
    {
      title: "Log In",
      to: "/login",
      classes: "btn btn-contrast",
    },
  ];

  return (
    <>
      {LINKS.map((link, index) => (
        <Link to={link.to} key={index} className={link.classes || "link"}>
          {link.title}
        </Link>
      ))}
    </>
  );
}
