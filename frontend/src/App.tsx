import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import { AppProvider, useUser } from "./store/app-store";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Auth from "./pages/auth/auth";
import Dashboard from "./pages/dashboard/dashboard";
import NotFound from "./pages/not-found/not-found";
import Request from "./pages/request/components/request";
import AddRequest from "./pages/request/components/add-request";

const ProtectedRoute = () => {
  const user = useUser();
  console.log("user", user);
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <Box>
      {/* <Navbar />  */}
        <Outlet />
    </Box>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />, // Protects all child routes
    children: [
      { index: true, element: <Dashboard /> },
      { path: "requests", element: <Request /> },
      { path: "requests/new", element: <AddRequest /> },
      { path: "*", element: <NotFound /> }, // Catch-all route for undefined paths
    ],
  },
  { path: "/auth", element: <Auth /> },
  { path: "*", element: <NotFound /> }, // Catch-all route for undefined paths outside protected routes
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
