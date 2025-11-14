import { useReducer } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Order = () => {
  const intialState = {
    orders : [
      { id: "ORD001", customer: "Alice", stock: 150, price: "$250.00", status: "Delivered" },
      { id: "ORD002", customer: "Bob", stock: 75, price: "$120.50", status: "Pending" },
      { id: "ORD003", customer: "Charlie", stock: 200, price: "$50.00", status: "Delivered" },
      { id: "ORD004", customer: "Diana", stock: 90, price: "$75.25", status: "Failed" },
      { id: "ORD005", customer: "Eve", stock: 300, price: "$300.00", status: "Delivered" },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_ORDER":
        return { ...state, orders: [...state.orders, action.payload] };
      case "DELETE_ORDER":
        return { ...state, orders: state.orders.filter(order => order.id !== action.payload) };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, intialState);

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
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-5">Recent Orders</h1>

      

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
                  <span className={`${getStatusColor(order.status)} text-white px-2 py-1 rounded-full text-[10px] sm:text-xs`}>
                    {order.status}
                  </span>
                </td>

                <td className="py-2 flex justify-center">
                  <BsThreeDotsVertical
                    className="text-gray-600 cursor-pointer hover:text-gray-900"
                    onClick={() => dispatch({ type: "DELETE_ORDER", payload: order.id })}
                  />
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
