import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SecondNav from "./components/SecondNav";

export default function App() {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <header>
        <Navbar />
        <SecondNav />
      </header>
      <main className="p-6 flex justify-evenly bg-light flex-grow">
        <Outlet />
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
}
