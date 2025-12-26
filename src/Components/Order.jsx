
import { useGlobal } from "/src/context/GlobalContext";
import { Link } from "react-router-dom";



const Order = () => {

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
    <div className="font-semibold bg-white rounded-lg shadow-sm mx-5 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-5">Recent Orders</h1>
      <h1>
        <Link className="bg-blue-900 rounded p-2 text-white cursor-pointer  " to="/order-cart">Order Cart</Link>

      </h1>
      </div>
      <hr className="mb-5" />

      <div className="flex">
        <table className="w-full text-center text-xs sm:text-sm md:text-base table-fixed">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Stock</th>
              <th className="py-2">Price</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {state.orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.customer}</td>
                <td className="py-2">{order.stock}</td>
                <td className="py-2">{order.price}</td>

                <td className="py-2">
                  <span
                    className={`${getStatusColor(order.status)} text-white px-2 py-1 rounded-full text-[10px] sm:text-xs`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="py-2 flex justify-center">
                <button
                  onClick={() =>
                    dispatch({
                      type: "ADD_ORDER_TO_CART",
                      payload: order,
                    })
                  }
                  className="bg-red-900 rounded-full p-2 text-white cursor-pointer hover:text-gray-900 sml:text-xs "
                >
                  Add to Cart
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="mt-6" />
    </div>
  );
};

export default Order;
