import { BsThreeDotsVertical } from "react-icons/bs";
import { useGlobal } from "../context/GlobalContext";



const TopProducts = () => {
  const { state, dispatch } = useGlobal(); 
  const getCategoryColor = (Category) => {
    switch (Category) {
      case "Electronics":
        return "border border-blue-400";
      case "Groceries":
        return "border border-green-400";
      case "Smart Home":
        return "border border-purple-400";
      case "Home Goods":
        return "border border-yellow-400";
      default:
        return "";
    }
  };

  return (
    <div className="font-semibold bg-white rounded-lg shadow-sm mx-5 p-5">
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-5">
        Top Products
      </h1>
      <hr className="mb-5" />

      <table className="w-full text-center text-xs sm:text-sm md:text-base table-fixed">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="py-2 px-1">Product Name</th>
            <th className="py-2 px-1">Category</th>
            <th className="py-2 px-1">Stock</th>
            <th className="py-2 px-1">Price</th>
            <th className="py-2 px-1">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {state.topProduct.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition">
              <td className="py-2">{product.ProductName}</td>

              <td className="py-2">
                <span
                  className={`${getCategoryColor(
                    product.Category
                  )} text-black px-2 py-1 rounded-full text-[10px] sm:text-xs`}
                >
                  {product.Category}
                </span>
              </td>

              <td className="py-2">{product.Stock}</td>

              <td className="py-2">{product.Price}</td>

              <td className="py-2 flex justify-center">
                <BsThreeDotsVertical
                  onClick={() =>
                    dispatch({
                      type: "DELETE_PRODUCT",
                      payload: product.id,
                    })
                  }
                  className="text-gray-600 cursor-pointer hover:text-gray-900 text-sm sm:text-base"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="mt-6" />
    </div>
  );
};

export default TopProducts;
