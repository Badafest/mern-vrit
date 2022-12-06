import { Link } from "react-router-dom";

export default function LinkList({ links, title }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm">{title}</span>
      {links.map((link, index) => (
        <Link to={link.to} key={index}>
          <span className="text-xs">{link.name}</span>
        </Link>
      ))}
    </div>
  );
}
