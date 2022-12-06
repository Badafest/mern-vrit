import { Link } from "react-router-dom";

export default function NavBrand() {
  return (
    <Link to="/" className="link">
      <div className="flex gap-2 min-w-max">
        <img className="h-6" src="/assets/logo.svg" />
        <span className="w-0 overflow-hidden md:w-auto">RedBag</span>
      </div>
    </Link>
  );
}
