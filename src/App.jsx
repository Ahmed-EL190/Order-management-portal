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
        <Route
          path="/login/:id"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route path="/" element={<Home />} />

        <Route path="/cart/:id" element={<Cart />} />

        <Route path="/order-cart/:id" element={<OrderCart />} />
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
