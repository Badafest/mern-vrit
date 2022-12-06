import BottomNavList from "./BottomNav/BottomNavList";

export default function BottomNav() {
  return (
    <nav className="fixed rounded-lg left-1/2 -translate-x-1/2 bottom-2 flex bg-light md:hidden">
      <BottomNavList />
    </nav>
  );
}
