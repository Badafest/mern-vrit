import { Link } from "react-router-dom";
import browsing from "../imgs/browsing.svg";

export default function Error() {
  return (
    <main className="p-6 flex flex-col gap-4 h-screen justify-center">
      <img src={browsing} className="mx-auto w-10/12 md:w-1/2" />
      <div className="text-center">
        Sorry, but we couldn't find what you were looking for :(
      </div>
      <Link to="/" className="btn btn-contrast">
        <span>Continue to RedBag</span>
      </Link>
    </main>
  );
}
