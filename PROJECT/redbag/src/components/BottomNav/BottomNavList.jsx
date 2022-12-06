import { Link } from "react-router-dom";

const LINKS = [
  {
    to: "/products",
    name: "products",
    icon: "shopping_cart",
  },
  {
    to: "/vendors",
    name: "vendors",
    icon: "storefront",
  },
  {
    to: "/help",
    name: "help",
    icon: "support",
  },
  {
    to: "/contact",
    name: "contact",
    icon: "phone_in_talk",
  },
  {
    to: "/login",
    name: "login",
    icon: "account_circle",
  },
];

export default function BottomNavList() {
  return LINKS.map((link, index) => (
    <Link to={link.to} key={index} className="link text-center m-1">
      <div className="icon bg-primary text-light">{link.icon}</div>
      <div className="text-xs text-gray-500">{link.name}</div>
    </Link>
  ));
}
