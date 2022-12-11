import NavBrand from "./Navbar/NavBrand";
import NavList from "./Navbar/Navlist";
import Search from "./Search";

export default function Navbar() {
  return (
    <nav className="bg-primary_dark text-light p-3 flex justify-between items-center">
      <NavBrand />
      <Search />
      <ul className="h-0 w-0 overflow-hidden md:h-auto md:w-auto nav-list flex items-center gap-6">
        <NavList />
      </ul>
    </nav>
  );
}
