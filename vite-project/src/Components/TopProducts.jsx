import { BsThreeDotsVertical } from "react-icons/bs";

const TopProducts = () => {
  return (
    <div className="font-semibold">
      {/* العنوان */}
      <h1 className="mx-5 md:mx-36 text-xl font-semibold mt-20 mb-5">
        Top Products
      </h1>
      <hr className="mx-5 md:mx-32" />

      {/* الجدول */}
      <div className="mx-5 md:mx-32 mt-6 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-5 text-center bg-white p-5 rounded-lg shadow-sm ">

        {/* Product Name */}
        <div className="bg-gray-50 rounded-lg p-3 w-[100px] mx-auto">
          <h2 className="text-gray-500 mb-7 text-sm whitespace-nowrap">Product Name</h2>
          <div className="mb-10">ORD001</div>
          <div className="mb-10">ORD002</div>
          <div className="mb-10">ORD003</div>
          <div className="mb-10">ORD004</div>
          <div className="mb-10">ORD005</div>
        </div>

        {/* Category / Status */}
        <div className="bg-gray-50 rounded-lg p-3 w-[120px] mx-auto">
          <h2 className="text-gray-500 mb-7 text-sm">Category</h2>
          <div className="bg-white rounded-full px-3 text-black mb-10 text-center border text-xs font-semibold">
            Electronics
          </div>
          <div className="bg-white rounded-full px-3 text-black mb-12 text-center border text-xs font-semibold">
            Electronics
          </div>
          <div className="bg-white rounded-full px-3 text-black mb-12 text-center border text-xs font-semibold">
            Groceries
          </div>
          <div className="bg-white rounded-full px-3 text-black mb-12 text-center border text-xs font-semibold">
            Smart Home
          </div>
          <div className="bg-white rounded-full px-3 text-black mb-12 text-center border text-xs font-semibold whitespace-nowrap">
            Home Goods
          </div>
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

        {/* Actions */}
        <div className="bg-gray-50 rounded-lg p-3 w-[80px] mx-auto">
          <h2 className="text-gray-500 mb-7 text-sm">Actions</h2>
          <div className="mb-12 flex justify-center"><BsThreeDotsVertical /></div>
          <div className="mb-12 flex justify-center"><BsThreeDotsVertical /></div>
          <div className="mb-12 flex justify-center"><BsThreeDotsVertical /></div>
          <div className="mb-12 flex justify-center"><BsThreeDotsVertical /></div>
          <div className="mb-12 flex justify-center"><BsThreeDotsVertical /></div>
        </div>
      </div>

      <hr className="mx-5 md:mx-32 mt-5 mb-10" />
    </div>
  );
};

export default TopProducts;
