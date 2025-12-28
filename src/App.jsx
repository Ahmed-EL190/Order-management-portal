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
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* 🏠 Home (Protected) */}
        <Route path="/" element={<Home />} />

        {/* 🔐 Login */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        {/* 🛒 Cart (Protected) */}
        <Route path="/cart" element={<Cart />} />

        {/* 📦 Order Cart (Protected) */}
        <Route path="/order-cart" element={<OrderCart />} />
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
