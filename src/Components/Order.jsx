import { Link, useNavigate} from "react-router-dom";
import { useGlobal } from "../context/useGlobal";
import { useEffect, useState } from "react";

const Order = () => {
  const [products, setProducts] = useState([]);
  const { state, dispatch } = useGlobal();


  // ===== Fetch Products =====
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const getProductForOrder = (orderId) => {
    const productById = products.find((product) => product.id === orderId);

    if (state.orders && state.orders.length > 0) {
      const orderIndex = state.orders.findIndex(
        (order) => order.id === orderId
      );
      if (orderIndex < products.length) {
        return products[orderIndex];
      }
    }

    return productById || (products.length > 0 ? products[0] : null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "Pending":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Failed":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md mx-2 xs:mx-3 sm:mx-4 md:mx-5 p-4 xs:p-5 sm:p-6 my-6 xs:my-8 sm:my-10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 xs:gap-4 mb-5 xs:mb-6">
        <h1 className="text-lg xs:text-xl sm:text-2xl md:text-2xl lgl:text-3xl font-bold text-gray-800 text-center sm:text-left">
          Recent Orders
        </h1>

        
      </div>

      {/* ===== Mobile View (up to 500px) ===== */}
      <div className="space-y-3 xs:space-y-4 block sml:hidden">
        {state.orders.map((order) => {
          const product = getProductForOrder(order.id);

          return (
            <div
              key={order.id}
              className="border rounded-lg p-3 xs:p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-800 text-sm xs:text-base">
                  Order #{order.id}
                </span>
                <span
                  className={`${getStatusColor(
                    order.status
                  )} px-2 py-0.5 xs:px-3 xs:py-1 rounded-full text-[10px] xs:text-xs font-semibold`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-start gap-3 xs:gap-4 mb-3">
                {product && (
                  <div className="flex-shrink-0">
                    <Link to={`/order-cart/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.title}
                              className="cursor-pointer w-16 h-16"
                              onClick={() => navigate(`/order-cart/${product.id}`)}
                            />
                          </Link>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <p className="text-sm xs:text-base text-gray-800 font-medium">
                      {order.customer}
                    </p>
                    <p className="text-xs xs:text-sm text-gray-600">Customer</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base xs:text-lg font-bold text-green-600">
                          {order.price}
                        </span>
                        <p className="text-xs text-gray-600">Price</p>
                      </div>

                      {product && product.rating && (
                        <div className="text-right">
                          <div className="flex items-center justify-end">
                            <span className="text-yellow-500 text-xs mr-1">
                              ⭐
                            </span>
                            <span className="text-xs font-bold text-gray-800">
                              {product.rating.rate}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-600 mt-0.5">
                            Rating
                          </p>
                        </div>
                      )}
                    </div>

                    {product && (
                      <span className="text-[10px] xs:text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded inline-block">
                        {product.category}
                      </span>
                    )}
                  </div>

                  {product && (
                    <p className="text-xs text-gray-500 truncate mt-2">
                      {product.title.length > 40
                        ? `${product.title.substring(0, 40)}...`
                        : product.title}
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
                className="mt-3 w-full bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white py-2 rounded-lg text-sm font-medium"
              >
                🛒 Add to Order
              </button>
            </div>
          );
        })}
      </div>

      {/* ===== Small Tablet View (500px - 666px) ===== */}
      <div className="hidden sml:block md:hidden">
        <div className="grid grid-cols-2 gap-3 xs:gap-4">
          {state.orders.map((order) => {
            const product = getProductForOrder(order.id);

            return (
              <div
                key={order.id}
                className="border rounded-lg p-3 xs:p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-gray-800 text-sm">
                    Order #{order.id}
                  </span>
                  <span
                    className={`${getStatusColor(
                      order.status
                    )} px-2 py-0.5 rounded-full text-[10px] font-semibold`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex flex-col items-center mb-3">
                  {product && (
                    <Link to={`/order-cart/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.title}
                              className="cursor-pointer w-16 h-16"
                              onClick={() => navigate(`/order-cart/${product.id}`)}
                            />
                          </Link>
                  )}

                  <p className="text-sm font-medium text-gray-800 text-start items-start">
                    {order.customer}
                  </p>
                  <p className="text-xs text-gray-600 text-start items-start mb-2">
                    Customer
                  </p>
                </div>

                <div className="space-y-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-green-600">
                        {order.price}
                      </span>
                      <p className="text-xs text-gray-600">Price</p>
                    </div>

                    {product && product.rating && (
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="text-yellow-500 text-xs mr-1">
                            ⭐
                          </span>
                          <span className="text-xs font-bold text-gray-800">
                            {product.rating.rate}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-600 mt-0.5">
                          Rating
                        </p>
                      </div>
                    )}
                  </div>

                  {product && (
                    <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-center block">
                      {product.category}
                    </span>
                  )}

                  {product && (
                    <p className="text-xs text-gray-500 text-center line-clamp-2 h-8">
                      {product.title}
                    </p>
                  )}
                </div>

                <button
                  onClick={() =>
                    dispatch({
                      type: "ADD_ORDER_TO_CART",
                      payload: order,
                    })
                  }
                  className="mt-auto w-full bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white py-2 rounded-lg text-sm font-medium"
                >
                  🛒 Add to Order
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Tablet View (667px - 767px) ===== */}
      <div className="hidden md:block mdl:hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="py-3 px-2 text-center">Order ID</th>
                <th className="py-3 px-2 items-start">Customer</th>
                <th className="py-3 px-2 text-center">Product</th>
                <th className="py-3 px-2 text-center">Price</th>
                <th className="py-3 px-2 text-center">Rating</th>
                <th className="py-3 px-2 text-center">Status</th>
                <th className="py-3 px-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {state.orders.map((order) => {
                const product = getProductForOrder(order.id);

                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-2 font-bold text-center">
                      #{order.id}
                    </td>

                    <td className="py-3 px-2">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {order.customer}
                        </p>
                        {product && (
                          <p className="text-[10px] text-gray-500 truncate max-w-[80px]">
                            {product.title}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-2">
                      {product ? (
                        <div className="flex justify-center">
                          <Link to={`/order-cart/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.title}
                              className="cursor-pointer w-16 h-16"
                              onClick={() => navigate(`/order-cart/${product.id}`)}
                            />
                          </Link>
                        </div>
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded mx-auto">
                          <span className="text-[10px] text-gray-500">
                            No Image
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-2 font-bold text-green-600 text-sm text-center">
                      {order.price}
                    </td>

                    <td className="py-3 px-2 text-center">
                      {product && product.rating ? (
                        <div className="flex flex-col items-center">
                          <div className="flex items-center">
                            <span className="text-yellow-500 text-xs">⭐</span>
                            <span className="text-xs font-bold text-gray-800 ml-0.5">
                              {product.rating.rate}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-500">
                            ({product.rating.count})
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex justify-center">
                        <span
                          className={`${getStatusColor(
                            order.status
                          )} px-2 py-0.5 rounded-full text-[10px] font-semibold text-center min-w-[60px]`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "ADD_ORDER_TO_CART",
                              payload: order,
                            })
                          }
                          className="bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white px-2 py-1 rounded text-[10px] font-medium"
                        >
                          🛒 Add
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Medium Tablet View (768px - 1023px) ===== */}
      <div className="hidden mdl:block lgl:hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="py-3 px-3 text-center">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3 text-center">Product</th>
                <th className="py-3 px-3 text-center">Price</th>
                <th className="py-3 px-3 text-center">Rating</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {state.orders.map((order) => {
                const product = getProductForOrder(order.id);

                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-3 font-bold text-center">
                      #{order.id}
                    </td>

                    <td className="py-3 px-3">
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.customer}
                        </p>
                        {product && (
                          <p className="text-xs text-gray-500 truncate max-w-[120px]">
                            {product.title}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      {product ? (
                        <div className="flex justify-center">
                          <Link to={`/order-cart/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.title}
                              className="cursor-pointer w-16 h-16"
                              onClick={() => navigate(`/order-cart/${product.id}`)}
                            />
                          </Link>
                        </div>
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded mx-auto">
                          <span className="text-xs text-gray-500">
                            No Image
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3 font-bold text-green-600 text-base text-center">
                      {order.price}
                    </td>

                    <td className="py-3 px-3 text-center">
                      {product && product.rating ? (
                        <div className="flex flex-col items-center">
                          <div className="flex items-center">
                            <span className="text-yellow-500 text-sm">⭐</span>
                            <span className="text-sm font-bold text-gray-800 ml-1">
                              {product.rating.rate}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              /5
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {product.rating.count} reviews
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex justify-center">
                        <span
                          className={`${getStatusColor(
                            order.status
                          )} px-3 py-1 rounded-full text-xs font-semibold text-center min-w-[80px]`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "ADD_ORDER_TO_CART",
                              payload: order,
                            })
                          }
                          className="bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white px-3 py-1.5 rounded text-xs font-medium"
                        >
                          🛒 Add
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Desktop View (1024px and above) ===== */}
      <div className="hidden lgl:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm lgl:text-base">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="py-4 px-4 text-center">Order ID</th>
                <th className="py-4 px-4 items-start text-start">Customer</th>
                <th className="py-4 px-4 text-center">Product</th>
                <th className="py-4 px-4 text-center">Price</th>
                <th className="py-4 px-4 text-center">Rating</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {state.orders.map((order) => {
                const product = getProductForOrder(order.id);

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition group"
                  >
                    <td className="py-4 px-4 font-bold text-center text-base">
                      #{order.id}
                    </td>

                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-800 text-base">
                          {order.customer}
                        </p>
                        {product && (
                          <p className="text-sm text-gray-500 truncate max-w-[180px]">
                            {product.title}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        {product ? (
                          <Link to={`/order-cart/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.title}
                              className="cursor-pointer w-16 h-16"
                              onClick={() => navigate(`/order-cart/${product.id}`)}
                            />
                          </Link>
                        ) : (
                          <div className="h-16 w-16 bg-gray-200 flex items-center justify-center rounded">
                            <span className="text-sm text-gray-500">
                              No Image
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold text-green-600 text-lg text-center">
                      {order.price}
                    </td>

                    <td className="py-4 px-4 text-center">
                      {product && product.rating ? (
                        <div className="flex flex-col items-center">
                          <div className="flex items-center">
                            <span className="text-yellow-500 text-base">
                              ⭐
                            </span>
                            <span className="text-base font-bold text-gray-800 ml-1">
                              {product.rating.rate}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">
                              /5
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {product.rating.count} reviews
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <span
                          className={`${getStatusColor(
                            order.status
                          )} px-4 py-1.5 rounded-full text-sm font-semibold text-center min-w-[100px]`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "ADD_ORDER_TO_CART",
                              payload: order,
                            })
                          }
                          className="bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white px-5 py-2 rounded-lg text-sm font-medium"
                        >
                          🛒 Add to Order
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
