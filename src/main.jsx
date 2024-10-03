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

const queryClient = new QueryClient()

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
        path: "/sidebar/projects",
        element: <Projects></Projects>
      },
      {
        path: "/sidebar/customer",
        element: <Customers></Customers>
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
