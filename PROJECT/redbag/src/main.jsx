import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./router";

import "./index.css";
import "./icons.css";
import { Provider } from "react-redux";
import store from "./store";
import { UserContextProvider } from "./context/user.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <RouterProvider router={routes} />
      </UserContextProvider>
    </Provider>
  </React.StrictMode>
);
