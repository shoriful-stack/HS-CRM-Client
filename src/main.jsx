import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tender from "./pages/Tender";
import Customers from "./pages/Customers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/sidebar",
    element: <Sidebar></Sidebar>,
    children: [
      {
        path: "/sidebar/dashboard",
        element: <Dashboard></Dashboard>
      },
      {
        path: "/sidebar/tender",
        element: <Tender></Tender>
      },
      {
        path: "/sidebar/customer",
        element:<Customers></Customers> 
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
