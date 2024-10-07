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
import Customers from "./pages/Customers";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import Projects from "./pages/Projects";
import Employee from "./pages/Employee";
import Department from "./pages/Department";
import Designation from "./pages/Designation";
import Contracts from "./pages/Contracts";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/dashboard",
    element: <Sidebar></Sidebar>,
    children: [
      {
        path: "/dashboard/home",
        element: <Dashboard></Dashboard>
      },
      {
        path: "/dashboard/projects",
        element: <Projects></Projects>
      },
      {
        path: "/dashboard/contracts",
        element: <Contracts></Contracts>
      },
      {
        path: "/dashboard/customers",
        element: <Customers></Customers>
      },
      {
        path: "/dashboard/employees",
        element: <Employee></Employee>
      },
      {
        path: "/dashboard/department",
        element: <Department></Department>
      },
      {
        path: "/dashboard/designation",
        element: <Designation></Designation>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
