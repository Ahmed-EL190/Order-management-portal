import { CiCircleCheck, CiCircleRemove, CiShoppingCart } from "react-icons/ci";
import { FaRegHourglass } from "react-icons/fa";

const Card = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lgl:grid-cols-4 gap-6 px-6 py-10 font-semibold mx-5">
      {/* 1 - Total Orders */}
      <div className="card bg-blue-500 text-white rounded-xl px-5 py-5">
        <div className="flex justify-between pb-5">
          <p>Total Orders</p>
          <CiShoppingCart className="text-xl font-bold" />
        </div>
        <h1 className="text-3xl font-bold">1,234</h1>
        <p className="text-sm">+15% from last month</p>
      </div>

      {/* 2 - Pending Orders */}
      <div className="card bg-green-500 text-white rounded-xl px-5 py-5">
        <div className="flex justify-between pb-5">
          <p>Pending Orders</p>
          <FaRegHourglass className="text-lg font-bold" />
        </div>
        <h1 className="text-3xl font-bold">150</h1>
        <p className="text-sm">+15% from last month</p>
      </div>

      {/* 3 - Delivered Orders */}
      <div className="card bg-gray-300 text-gray-900 rounded-xl px-5 py-5">
        <div className="flex justify-between pb-5">
          <p>Delivered Orders</p>
          <CiCircleCheck className="text-xl font-bold" />
        </div>
        <h1 className="text-3xl font-bold">1,050</h1>
        <p className="text-sm">+15% from last month</p>
      </div>

      {/* 4 - Failed Orders */}
      <div className="card bg-red-500 text-white rounded-xl px-5 py-5">
        <div className="flex justify-between pb-5">
          <p>Failed Orders</p>
          <CiCircleRemove className="text-xl font-bold" />
        </div>
        <h1 className="text-3xl font-bold">34</h1>
        <p className="text-sm">+15% from last month</p>
      </div>
    </div>
  );
};

export default Card;
