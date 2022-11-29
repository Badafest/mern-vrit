import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { Provider } from "react-redux";
import store from "./store";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
