import {
  CiCircleCheck,
  CiCircleRemove,
  CiShoppingCart
} from "react-icons/ci";
import { FaRegHourglass } from "react-icons/fa";

const Card = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 md:px-6 py-8 font-semibold mx-auto max-w-7xl">

      {/* Total Orders */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-5 shadow-md hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm opacity-90">Total Orders</p>
          <CiShoppingCart className="text-2xl" />
        </div>
        <h1 className="text-3xl font-bold mb-1">1.234</h1>
        <p className="text-xs opacity-90">+15% from last month</p>
      </div>

      {/* Pending Orders */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-5 shadow-md hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm opacity-90">Pending Orders</p>
          <FaRegHourglass className="text-xl" />
        </div>
        <h1 className="text-3xl font-bold mb-1">150</h1>
        <p className="text-xs opacity-90">+15% from last month</p>
      </div>

      {/* Delivered Orders */}
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-700">Delivered Orders</p>
          <CiCircleCheck className="text-2xl text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-1">1.050</h1>
        <p className="text-xs text-gray-600">+15% from last month</p>
      </div>

      {/* Failed Orders */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-5 shadow-md hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm opacity-90">Failed Orders</p>
          <CiCircleRemove className="text-2xl" />
        </div>
        <h1 className="text-3xl font-bold mb-1">34</h1>
        <p className="text-xs opacity-90">+15% from last month</p>
      </div>

    </div>
  );
};

export default Card;
