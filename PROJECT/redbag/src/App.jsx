import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="p-12 flex justify-evenly bg-lighter flex-grow">
        <Outlet />
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
}
