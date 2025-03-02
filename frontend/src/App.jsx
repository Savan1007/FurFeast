import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useUser } from "./store/app-store"; 
import Auth from "./pages/auth/auth";
import Dashboard from "./pages/dashboard/dashboard";
import Request from "./pages/request/request";
import NotFound from "./pages/not-found/not-found.jsx"; 
import { AppProvider } from "./store/app-store";
import Navbar from "./components/navbar";

// Protected Route Component
const ProtectedRoute = () => {
  const user = useUser();
  console.log("user", user)
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <Navbar /> {/* Include Navbar component */}
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />, // Protects all child routes
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'requests', element: <Request /> },
      { path: '*', element: <NotFound /> }, // Catch-all route for undefined paths
    ],
  },
  { path: "/auth", element: <Auth /> },
  { path: "*", element: <NotFound /> }, // Catch-all route for undefined paths outside protected routes
]);

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
