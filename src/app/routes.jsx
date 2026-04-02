import { Navigate, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useWedding } from "../context/WeddingContext";

import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Events from "../pages/Events";
import Members from "../pages/Members";
import Expenses from "../pages/Expenses";
import Login from "../pages/Login";
import JoinWedding from "../pages/JoinWedding";
import CreateWedding from "../pages/CreateWedding";

function AppGate({ children }) {
  const { user, loading: authLoading } = useAuth();
  const { weddingId, loading: weddingLoading } = useWedding();

  if (authLoading || weddingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!weddingId) {
    return <Navigate to="/choose-wedding" replace />;
  }

  return children;
}

function GuestOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function WeddingSetupRoute({ children }) {
  const { user, loading: authLoading } = useAuth();
  const { weddingId, loading: weddingLoading } = useWedding();

  if (authLoading || weddingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (weddingId) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function ChooseWedding() {
  return <Navigate to="/create-wedding" replace />;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestOnlyRoute>
        <Login />
      </GuestOnlyRoute>
    ),
  },

  {
    path: "/choose-wedding",
    element: (
      <WeddingSetupRoute>
        <ChooseWedding />
      </WeddingSetupRoute>
    ),
  },

  {
    path: "/create-wedding",
    element: (
      <WeddingSetupRoute>
        <CreateWedding />
      </WeddingSetupRoute>
    ),
  },

  {
    path: "/join",
    element: (
      <WeddingSetupRoute>
        <JoinWedding />
      </WeddingSetupRoute>
    ),
  },

  {
    path: "/",
    element: (
      <AppGate>
        <Dashboard />
      </AppGate>
    ),
  },

  {
    path: "/tasks",
    element: (
      <AppGate>
        <Tasks />
      </AppGate>
    ),
  },

  {
    path: "/events",
    element: (
      <AppGate>
        <Events />
      </AppGate>
    ),
  },

  {
    path: "/members",
    element: (
      <AppGate>
        <Members />
      </AppGate>
    ),
  },

  {
    path: "/expenses",
    element: (
      <AppGate>
        <Expenses />
      </AppGate>
    ),
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;