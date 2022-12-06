import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Vendors from "./pages/Vendors";
import Register from "./pages/Register";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/vendors",
        element: <Vendors />,
      },
    ],
  },
]);
