import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import ChatPage from "./pages/Chat";
import DocumentsPage from "./pages/Documents";
import SettingsPage from "./pages/Settings";

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export const router = createBrowserRouter([
    {
  path: "/",
  element: <Navigate to="/login" replace />,
},
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/documents",
        element: <DocumentsPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);