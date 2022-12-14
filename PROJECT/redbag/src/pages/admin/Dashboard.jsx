import { Link, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <main className="px-6 flex justify-evenly bg-light flex-grow">
        <aside className="min-w-max w-1/6 bg-primary rounded-l-lg shadow-md px-12 py-6 text-primary_dark flex flex-col gap-2">
          <Link to="/admin" className="btn bg-light">
            Home
          </Link>
          <Link to="/admin/category" className="btn bg-light">
            Category
          </Link>
          <Link to="/admin/vendor" className="btn bg-light">
            Vendor
          </Link>
          <Link to="/admin/product" className="btn bg-light">
            Product
          </Link>
        </aside>
        <section className="w-5/6 bg-white rounded-r-lg shadow-md h-screen overflow-hidden">
          <Outlet />
        </section>
      </main>
    </>
  );
}
