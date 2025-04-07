import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import {
  AppProvider,
  useAccessToken,
  useActions,
  useAuthUser,
  useUser,
} from "./store/app-store";
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
import { useGetAllRoles } from "./pages/users/api/api";
import { useFetchAllInventory } from "./pages/inventory/api/api";
import Inventory from "./pages/inventory/inventory";
import Reports from "./pages/report/reports";

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
      { path: "inventory", element: <Inventory /> },
      { path: "requests", element: <Request /> },
      { path: "requests/new", element: <AddRequest /> },
      { path: "users", element: <Users /> },
      { path: "reports", element: <Reports /> },
      { path: "*", element: <NotFound /> }, // Catch-all route for undefined paths
    ],
  },
  { path: "/auth", element: <Auth /> },
  { path: "*", element: <NotFound /> }, // Catch-all route for undefined paths outside protected routes
]);

function App() {
  const { data: roles, mutate: roleMutate, isSuccess } = useGetAllRoles();
  const {
    data: inventory,
    mutate: InventoryMutate,
    isSuccess: inventorySuccess,
  } = useFetchAllInventory();
  const storeActions = useActions();

  const user = useUser();

  const getFilteredRoutes = () => {
    const userRole = user?.roles[0]?.name; // Assuming roles is an array and you want the first role

    if (userRole === "supplier" || userRole === "community") {
      return createBrowserRouter([
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: "*", element: <NotFound /> },
            { path: "requests/new", element: <AddRequest /> },
          ],
        },
        { path: "/auth", element: <Auth /> },
        { path: "*", element: <NotFound /> }, // Catch-all route for undefined paths outside protected routes
      ]);
    }

    return router; // Default router for other roles
  };

  const filteredRouter = getFilteredRoutes();

  if (isSuccess && inventorySuccess) {
    storeActions?.setRoles(roles?.data);
    storeActions?.setInventory(inventory?.data);
  }

  useEffect(() => {
    if (!isSuccess) {
      roleMutate(undefined);
    }
    if (!inventorySuccess) {
      InventoryMutate(undefined);
    }
  }, []);

  return (
    <>
      <RouterProvider router={filteredRouter} />
    </>
  );
}

export default App;
