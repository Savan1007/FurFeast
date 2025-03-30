import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import { AppProvider, useAccessToken, useAuthUser } from "./store/app-store";
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
import Users from "./pages/users/users";

// Example: Check token expiry
const isTokenValid = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return false;

  const decodedToken = JSON.parse(atob(accessToken.split(".")[1])); // Decode JWT
  return decodedToken.exp * 1000 > Date.now(); // Check if token is expired
};

const ProtectedRoute = () => {
  const user = useAuthUser();
  const accessToken = useAccessToken();

  // If user or accessToken is undefined, assume the state is still loading
  // if (user === undefined || accessToken === undefined) {
  //   return <>Loading ... </>  // Render nothing or a loading spinner
  // }

  if (!user || !accessToken || !isTokenValid()) {
    // Redirect to auth page if user is not logged in or token is invalid
    return <Navigate to="/auth" />;
  }

  return (
    <Box>
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
      { path: "users", element: <Users /> },
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
