import { createBrowserRouter, Navigate } from "react-router-dom";

import Main from "./Main";

import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";

import App from "./pages/private/App";
import Private from "./components/Private";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
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
        path: "/app",
        element: <Private />,
        children: [
          {
            path: "/app",
            element: <App />,
          },
        ],
      },
    ],
  },
]);
