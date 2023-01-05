import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Protected from "./components/Protected";
import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Protected />,
        children: [
          {
            path: "/app",
            element: <App />,
          },
          {
            path: "/",
            element: <Navigate to="/app" />,
          },
        ],
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
        path: "/forgotPassword",
        element: <div>No one can save you now :(</div>,
      },
    ],
  },
]);
