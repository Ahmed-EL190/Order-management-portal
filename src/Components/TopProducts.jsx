import { Link } from "react-router-dom";
import { useGlobal } from "../context/useGlobal";

const TopProducts = () => {
  const { state, dispatch } = useGlobal();

  // const getCategoryColor = (category) => {
  //   switch (category) {
  //     case "Electronics":
  //       return "border border-blue-400 text-blue-600";
  //     case "Groceries":
  //       return "border border-green-400 text-green-600";
  //     case "Smart Home":
  //       return "border border-purple-400 text-purple-600";
  //     case "Home Goods":
  //       return "border border-yellow-400 text-yellow-600";
  //     default:
  //       return "border border-gray-300 text-gray-600";
  //   }
  // };

  return (
    <div className="bg-white rounded-lg shadow-sm mx-3 sm:mx-5 p-4 sm:p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base sm:text-xl md:text-2xl font-semibold">
          Top Products
        </h1>

        <Link
          to="/cart"
          className="bg-blue-900 text-white text-xs sm:text-sm px-3 py-1.5 rounded"
        >
          Cart
        </Link>
      </div>

      <hr className="mb-4" />

      <table className="w-full text-center text-[10px] sm:text-sm table-fixed">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="py-2">Product</th>
            <th className="py-2 hidden sm:table-cell">Category</th>
            <th className="py-2 hidden md:table-cell">Stock</th>
            <th className="py-2">Price</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {state.topProduct.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="py-2 font-medium truncate">
                {product.ProductName}
              </td>

              <td className="py-2 hidden sm:table-cell">
                {/* <span
                  className={`${getCategoryColor(
                    product.Category
                  )} px-2 py-1 rounded-full text-[9px] sm:text-xs`}
                >
                  {product.Category}
                </span> */}
              </td>

              <td className="py-2 hidden md:table-cell">
                {product.Stock}
              </td>

              <td className="py-2 font-semibold">
                ${product.Price}
              </td>

              <td className="py-2">
                <button
                  onClick={() =>
                    dispatch({
                      type: "ADD_PRODUCT",
                      payload: product,
                    })
                  }
                  className="
                    bg-red-900 
                    text-white 
                    text-[9px] sm:text-xs 
                    px-3 py-1.5 
                    rounded-full 
                    hover:bg-red-700
                    transition
                  "
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="mt-5" />
    </div>
  );
};

export default TopProducts;
