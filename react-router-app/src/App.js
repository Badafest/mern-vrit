import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import Todos from "./pages/Todos";
import Landing from "./pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Landing /> },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "todos",
        element: <Todos />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
