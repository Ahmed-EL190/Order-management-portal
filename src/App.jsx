
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { GlobalProvider } from "./context/GlobalContext.jsx"; 
import Cart from "./Pages/Cart";
import OrderCart from "./Pages/OrderCart";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="Login" element={<Login />} />
      <Route path="Cart" element={<Cart />} />
      <Route path="/order-cart" element={<OrderCart />} />

    </>
  )
);

const App = () => {
  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
};

export default App;
