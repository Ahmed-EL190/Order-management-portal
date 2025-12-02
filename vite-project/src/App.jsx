
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { GlobalProvider } from "./context/GlobalContext"; 
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="Login" element={<Login />} />
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
