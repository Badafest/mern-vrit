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

import PrivateProvider from "./components/PrivateProvider";
import Dashboard from "./pages/private/Dashboard";
import Account from "./pages/private/Account";
import ResetPassword from "./pages/ResetPassword";

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
        path: "/reset_password",
        element: <ResetPassword />,
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
      {
        path: "/app",
        element: <PrivateProvider />,
        children: [
          {
            path: "/app",
            element: <Dashboard />,
          },
          {
            path: "/app/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/app/account/:id",
            element: <Account />,
          },
        ],
      },
    ],
  },
]);
