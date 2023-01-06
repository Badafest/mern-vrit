import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Protected from "./components/Protected";
import { ConversationsProvider } from "./context/Conversations";
import App from "./pages/App";
import ForgotPassword from "./pages/ForgotPassword";
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
            element: (
              <ConversationsProvider>
                <App />
              </ConversationsProvider>
            ),
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
        element: <ForgotPassword />,
      },
    ],
  },
]);
