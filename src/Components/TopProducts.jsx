import { Link } from "react-router-dom";
import { useGlobal } from "../context/useGlobal";

const TopProducts = () => {
  const { state, dispatch } = useGlobal();

  return (
    <div className="bg-white rounded-xl shadow-md mx-4 md:mx-5 p-5 my-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Top Products
        </h1>

        <Link
          to="/cart"
          className="bg-blue-900 hover:bg-blue-800 transition text-white px-4 py-2 rounded-lg text-sm"
        >
          Cart
        </Link>
      </div>

      {/* ===== Mobile View (Cards) ===== */}
      <div className="space-y-4 md:hidden">
        {state.topProduct.map(product => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-800 truncate">
                {product.ProductName}
              </h2>
              <span className="text-sm font-bold text-green-600">
                ${product.Price}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p><b>Category:</b> {product.Category}</p>
              <p><b>Stock:</b> {product.Stock}</p>
            </div>

            <button
              onClick={() =>
                dispatch({
                  type: "ADD_PRODUCT",
                  payload: product,
                })
              }
              className="mt-4 w-full bg-red-900 hover:bg-red-800 transition text-white py-2 rounded-lg text-sm"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* ===== Desktop / Tablet View (Table) ===== */}
      <table className="hidden md:table w-full text-sm text-center mt-6">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="py-3">Product</th>
            <th className="py-3">Category</th>
            <th className="py-3">Stock</th>
            <th className="py-3">Price</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {state.topProduct.map(product => (
            <tr
              key={product.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="py-3 font-medium truncate">
                {product.ProductName}
              </td>

              <td className="py-3">
                {product.Category}
              </td>

              <td className="py-3">
                {product.Stock}
              </td>

              <td className="py-3 font-semibold text-green-600">
                ${product.Price}
              </td>

              <td className="py-3">
                <button
                  onClick={() =>
                    dispatch({
                      type: "ADD_PRODUCT",
                      payload: product,
                    })
                  }
                  className="bg-red-900 hover:bg-red-800 transition text-white px-4 py-1.5 rounded-full text-xs"
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default TopProducts;
