import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "./App";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Vendors from "./pages/Vendors";
import Register from "./pages/Register";

import PrivateProvider from "./components/Providers/PrivateProvider";
import Account from "./pages/private/Account";
import Cart from "./pages/private/Cart";
import Favorites from "./pages/private/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Product from "./pages/Product";

import AdminProvider from "./components/Providers/AdminProvider";
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/Category";
import Vendor from "./pages/admin/Vendor";
import ProductAdmin from "./pages/admin/Product";

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
        element: <ForgotPassword />,
      },
      {
        path: "/reset_password/new",
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
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/app",
        element: <PrivateProvider />,
        children: [
          {
            path: "/app",
            element: <Navigate to="/app/cart" />,
          },
          {
            path: "/app/cart",
            element: <Cart />,
          },
          {
            path: "/app/favorites",
            element: <Favorites />,
          },
          {
            path: "/app/account/:id",
            element: <Account />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminProvider />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
        children: [
          {
            path: "/admin/category",
            element: <Category />,
          },
          {
            path: "/admin/vendor",
            element: <Vendor />,
          },
          {
            path: "/admin/product",
            element: <ProductAdmin />,
          },
        ],
      },
    ],
  },
]);
