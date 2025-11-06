import { BsThreeDotsVertical } from "react-icons/bs";

const Order = () => {
  return (
    <div className="font-semibold">
      <h1 className="mx-5 md:mx-36 text-xl font-semibold mb-5">Recent Orders</h1>
      <hr className="mx-5 md:mx-32" />

      {/* Container */}
      <div className="mx-5 md:mx-32 mt-6 grid grid-cols-3 sm:grid-cols-4 mdl:grid-cols-6 gap-10 text-center bg-white p-5 rounded-lg shadow-sm ">

        {/* Order ID */}
        <div className="bg-gray-50 rounded-lg p-3 w-[100px] mx-auto">
          <h2 className="text-gray-500 mb-7 text-sm">Order ID</h2>
          <div className="mb-10">ORD001</div>
          <div className="mb-10">ORD002</div>
          <div className="mb-10">ORD003</div>
          <div className="mb-10">ORD004</div>
          <div className="mb-10">ORD005</div>
        </div>

        {/* Customer */}
        <div className="bg-gray-50 rounded-lg p-3 w-[100px] mx-auto">
          <h2 className="text-gray-500 mb-7 text-sm">Customer</h2>
          <div className="mb-10">Alice</div>
          <div className="mb-10">Bob</div>
          <div className="mb-10">Charlie</div>
          <div className="mb-10">Diana</div>
          <div className="mb-10">Eve</div>
        </div>

        {/* Stock */}
        <div className="bg-gray-50 rounded-lg p-3 w-[100px] mx-auto">
          <h2 className="text-gray-500 mb-7 text-sm">Stock</h2>
          <div className="mb-10">150</div>
          <div className="mb-10">75</div>
          <div className="mb-10">200</div>
          <div className="mb-10">90</div>
          <div className="mb-10">300</div>
        </div>

        {/* Price */}
        <div className="bg-gray-50 rounded-lg p-3 w-[100px] mx-auto">
          <h2 className="text-gray-500 mb-7 text-sm">Price</h2>
          <div className="mb-10">$250.00</div>
          <div className="mb-10">$120.50</div>
          <div className="mb-10">$50.00</div>
          <div className="mb-10">$75.25</div>
          <div className="mb-10">$300.00</div>
        </div>

        {/* Status */}
        <div className="bg-gray-50 rounded-lg p-3 w-[100px] mx-auto">
          <h2 className="text-gray-500 mb-7 text-sm">Status</h2>
          <div className="bg-blue-600 rounded-full px-2 py-1 text-white mb-10 text-xs">Delivered</div>
          <div className="bg-green-600 rounded-full px-2 py-1 text-white mb-10 text-xs">Pending</div>
          <div className="bg-blue-600 rounded-full px-2 py-1 text-white mb-10 text-xs">Delivered</div>
          <div className="bg-red-600 rounded-full px-2 py-1 text-white mb-10 text-xs">Failed</div>
          <div className="bg-blue-600 rounded-full px-2 py-1 text-white mb-10 text-xs">Delivered</div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 rounded-lg p-3 w-[100px] mx-auto">
          <h2 className="text-gray-500 mb-7 text-sm">Actions</h2>
          <div className="mb-12 flex justify-center"><BsThreeDotsVertical /></div>
          <div className="mb-12 flex justify-center"><BsThreeDotsVertical /></div>
          <div className="mb-12 flex justify-center"><BsThreeDotsVertical /></div>
          <div className="mb-12 flex justify-center"><BsThreeDotsVertical /></div>
          <div className="mb-12 flex justify-center"><BsThreeDotsVertical /></div>
        </div>
      </div>

      <hr className="mx-5 md:mx-32 mt-5" />
    </div>
  );
};

export default Order;
