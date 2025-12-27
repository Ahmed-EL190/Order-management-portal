import { useGlobal } from "../context/useGlobal";

const OrderCart = () => {
  const { state } = useGlobal();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📦 Order Cart
        </h2>

        {state.orderCart.length === 0 && (
          <p className="text-center text-gray-500">
            Cart is empty
          </p>
        )}

        <div className="space-y-4">
          {state.orderCart.map(order => (
            <div
              key={order.id}
              className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  Order ID
                </span>
                <span className="font-semibold text-gray-800">
                  #{order.id}
                </span>
              </div>

              <div className="flex flex-col text-center">
                <span className="text-sm text-gray-500">
                  Customer
                </span>
                <span className="font-medium text-gray-700">
                  {order.customer}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">
                  Qty
                </span>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                  x {order.qty}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OrderCart;
