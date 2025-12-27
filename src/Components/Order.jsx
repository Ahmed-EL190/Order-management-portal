import { Link } from "react-router-dom";
import { useGlobal } from "../context/useGlobal";
import { useEffect, useState } from "react";

const Order = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const { state, dispatch } = useGlobal();

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-blue-600";
      case "Pending":
        return "bg-green-600";
      case "Failed":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md mx-4 md:mx-5 p-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Recent Orders
        </h1>

        <Link
          to="/order-cart"
          className="bg-blue-900 hover:bg-blue-800 transition text-white px-4 py-2 rounded-lg text-sm"
        >
          Order Cart
        </Link>
      </div>

      {/* ===== Mobile View (Cards) ===== */}
      <div className="space-y-4 md:hidden">
        {state.orders.map(order => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-700">
                Order #{order.id}
              </span>
              <span
                className={`${getStatusColor(order.status)} text-white px-2 py-1 rounded-full text-xs`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {products.length > 0 && (
                <img
                  src={products[1].image}
                  alt=""
                  className="h-16 w-16 object-contain"
                />
              )}

              <div className="flex-1 text-sm text-gray-600">
                <p><b>Customer:</b> {order.customer}</p>
                <p><b>Price:</b> {order.price} </p>
              </div>
            </div>
 
            <button
              onClick={() =>
                dispatch({
                  type: "ADD_ORDER_TO_CART",
                  payload: order,
                })
              }
              className="
                mt-4 w-full
                bg-red-900
                hover:bg-red-800
                active:bg-red-800
                active:scale-95
                transition-all duration-200
                text-white py-2 rounded-lg text-sm
              "
            >
              🛒Add to order
            </button>
          </div>
        ))}
      </div>

      {/* ===== Desktop / Tablet View (Table) ===== */}
      <table className="hidden md:table w-full text-sm text-center mt-6">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="py-3">Order ID</th>
            <th className="py-3">Customer</th>
            <th className="py-3">Product</th>
            <th className="py-3">Price</th>
            <th className="py-3">Status</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y ">
          {state.orders.map(order => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="py-3 font-medium">
                #{order.id}
              </td>

              <td className="py-3">
                {order.customer}
              </td>

              <td className="py-3">
                {products.length > 0 && (
                  <img
                    src={products[1].image}
                    alt={products[1].image}
                    className="h-16 w-16 object-contain mx-auto"
                  />
                )}
              </td>

              <td className="py-3 font-semibold text-green-600">
                {order.price}
              </td>

              <td className="py-3">
                <span
                  className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-xs`}
                >
                  {order.status}
                </span>
              </td>

              <td className="py-3">
                <button
                  onClick={() =>
                    dispatch({
                      type: "ADD_ORDER_TO_CART",
                      payload: order,
                    })
                  }
                  className="
                      bg-red-900 hover:bg-red-800
                      active:scale-95
                      transition-all duration-200
                      text-white px-4 py-1.5
                      rounded-full text-xs
                      flex items-center gap-1 mx-auto
                    "
                >
                  🛒Add to order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Order;
