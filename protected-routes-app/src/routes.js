import { createBrowserRouter } from "react-router-dom";

import App from "./App.js";
import Login from "./pages/user/Login.js";
import Register from "./pages/user/Register.js";
import Welcome from "./pages/private/Welcome.js";

import { UserContextProvider } from "./context/UserContext.js";
import Protected from "./components/Protected.js";

export default createBrowserRouter([
  {
    path: "/",
    element: <UserContextProvider />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/register", element: <Register /> },
      {
        path: "/app",
        element: <Protected />,
        children: [
          {
            path: "/app",
            element: <Welcome />,
          },
        ],
      },
    ],
  },
]);
