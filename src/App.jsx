import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Home from "./Pages/Home";
import Login from "./Login";
import Cart from "./Pages/Cart";
import OrderCart from "./Pages/OrderCart";
import ProtectedRoute from "./ProtectedRoute";
import { GlobalProvider } from "./context/GlobalContext.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* 🔐 Login - يجب أن يأتي أولاً */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        {/* 🏠 Home (Protected) */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 🛒 Cart (Protected) */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* 📦 Order Cart (Protected) */}
        <Route
          path="/order-cart"
          element={
            <ProtectedRoute user={user}>
              <OrderCart />
            </ProtectedRoute>
          }
        />

        {/* 🚫 404 - Page Not Found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>
    )
  );

  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
};

export default App;