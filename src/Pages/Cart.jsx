import { useGlobal } from "../context/useGlobal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state } = useGlobal();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 flex flex-col">

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🛒 Cart
        </h2>

        {state.cart.length === 0 && (
          <p className="text-center text-gray-500">
            Cart is empty
          </p>
        )}

        <div className="space-y-4 flex-1">
          {state.cart.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  Product
                </span>
                <span className="font-semibold text-gray-800">
                  {item.ProductName}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">
                  Qty
                </span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                  x {item.qty}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition active:scale-95"
        >
          ⬅ Back to Home
        </button>

      </div>
    </div>
  );
};

export default Cart;
