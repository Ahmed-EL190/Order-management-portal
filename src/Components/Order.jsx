import { Link } from "react-router-dom";
import { useGlobal } from "../context/useGlobal";
import { useEffect, useState } from "react";

const Order = () => {
  const [products, setProducts] = useState([]);
  const [detailsCard, setDetailsCard] = useState(null);

  const { state, dispatch } = useGlobal();

  // ===== Fetch Products =====
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getProducts();
  }, []);

  const getProductForOrder = (orderId) => {
    const productById = products.find(product => product.id === orderId);
   
    if (state.orders && state.orders.length > 0) {
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      if (orderIndex < products.length) {
        return products[orderIndex];
      }
    }
    
    return productById || (products.length > 0 ? products[0] : null);
  };

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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Recent Orders
        </h1>

        <Link
          to="/order-cart/1"
          className="bg-blue-900 hover:bg-blue-800 transition text-white px-4 py-2 rounded-lg text-sm"
        >
          Order Cart
        </Link>
      </div>

      {/* ===== Mobile View ===== */}
      <div className="space-y-4 md:hidden">
        {state.orders.map((order) => {
          const product = getProductForOrder(order.id);
          
          return (
            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-700">
                  Order #{order.id}
                </span>
                <span
                  className={`${getStatusColor(
                    order.status
                  )} text-white px-2 py-1 rounded-full text-xs`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {product && (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-16 w-16 object-contain cursor-pointer"
                    onClick={() => setDetailsCard(product)}
                  />
                )}

                <div className="flex-1 text-sm text-gray-600">
                  <p>
                    <b>Customer:</b> {order.customer}
                  </p>
                  <p>
                    <b>Price:</b>{" "}
                    <span className="text-green-600 font-bold">
                      ${order.price}
                    </span>
                  </p>
                  {product && (
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {product.title}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() =>
                  dispatch({
                    type: "ADD_ORDER_TO_CART",
                    payload: order,
                  })
                }
                className="mt-4 w-full bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white py-2 rounded-lg text-sm"
              >
                🛒 Add to order
              </button>
            </div>
          );
        })}
      </div>

      {/* ===== Desktop / Tablet View ===== */}
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

        <tbody className="divide-y">
          {state.orders.map((order) => {
            const product = getProductForOrder(order.id);
            
            return (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="py-3 font-medium">#{order.id}</td>
                <td className="py-3">{order.customer}</td>

                <td className="py-3">
                  {product ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-16 w-16 object-contain mx-auto cursor-pointer"
                      onClick={() => setDetailsCard(product)}
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-200 flex items-center justify-center rounded mx-auto">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                </td>

                <td className="py-3 font-semibold text-green-600">
                  ${order.price}
                </td>

                <td className="py-3">
                  <span
                    className={`${getStatusColor(
                      order.status
                    )} text-white px-3 py-1 rounded-full text-xs`}
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
                    className="bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white px-4 py-1.5 rounded-full text-xs"
                  >
                    🛒 Add to order
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ===== Product Details Modal ===== */}
      {detailsCard && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setDetailsCard(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-80 md:w-[28rem] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-56 flex items-center justify-center mb-4">
              <img
                src={detailsCard.image}
                alt={detailsCard.title}
                className="h-full object-contain"
              />
            </div>

            <span className="text-[11px] uppercase tracking-wide bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {detailsCard.category}
            </span>

            <h2 className="text-sm font-bold text-gray-800 mt-3">
              {detailsCard.title}
            </h2>

            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {detailsCard.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-green-600">
                ${detailsCard.price}
              </span>

              {detailsCard.rating && (
                <span className="text-xs text-gray-500">
                  ⭐ {detailsCard.rating.rate} / 5
                  <span className="ml-1">({detailsCard.rating.count})</span>
                </span>
              )}
            </div>

            <button
              onClick={() => setDetailsCard(null)}
              className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-sm font-medium active:scale-95 transition-all duration-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;