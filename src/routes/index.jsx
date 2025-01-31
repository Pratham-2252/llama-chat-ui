/*=========================================================================
 * Sr.No     Modified by       Date          Status        Reason
 *=========================================================================
 *  1        Achal S.          28-09-2024    Done          Created Route for bidder supplier summary page..
 *  2        Harshit M         20-11-2024    Done          Remove My page from both logins.
 *  3       Prathamesh S       22-11-2024    Done          Supplier Negotiation module added.
 * =========================================================================
 *
 * */
import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Encryption from "../Encryption";
import Home from "../components/Home";
import Login from "../components/Login";
import PromptPage from "../components/PromptPage";
import RegistrationForm from "../components/RegistrationForm";
import { ProtectedRoute } from "./ProtectedRoute";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <RegistrationForm />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/test",
      element: <Encryption />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/home",
          element: <PromptPage />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default Routes;
