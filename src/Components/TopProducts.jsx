import { Link } from "react-router-dom";
import { useGlobal } from "../context/useGlobal";
import { useEffect, useState } from "react";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);
  
  const { state, dispatch } = useGlobal();

  const categoryStyle = (cat) => {
    switch (cat) {
      case "electronics":
        return "bg-blue-100 text-blue-700";
      case "men's clothing":
        return "bg-green-100 text-green-700";
      case "women's clothing":
        return "bg-pink-100 text-pink-700";
      case "jewelery":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md mx-4 md:mx-5 p-5 my-10">

      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Top Products
        </h1>

        <Link
          to="/cart"
          className="bg-blue-900 hover:bg-blue-800 transition text-white px-4 py-2 rounded-lg text-sm"
        >
          Go to Cart
        </Link>
      </div>

      {/* ===== Mobile View ===== */}
      <div className="space-y-4 md:hidden">
        {state.topProduct.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-3">
              <td className="py-3">
                {products.length > 0 && (
                  <img
                    src={products[1].image}
                    alt={products[1].image}
                    className="h-16 w-16 object-contain mx-auto"
                  />
                )}
              </td>

              <div className="flex-1">
                <h2 className="font-semibold text-gray-800 truncate">
                  {product.ProductName}
                </h2>

                <span className="text-sm font-bold text-green-600">
                  {product.Price}
                </span>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <b>Category:</b>{" "}
                <span
                  className={`${categoryStyle(product.Category)}
                  px-2 py-0.5 rounded-full text-xs font-semibold`}
                >
                  {product.Category}
                </span>
              </p>

              <p><b>Stock:</b> {product.Stock}</p>
            </div>

            <button
              onClick={() =>
                dispatch({ type: "ADD_PRODUCT", payload: product })
              }
              className="
                mt-4 w-full
                bg-red-900
                hover:bg-red-800
                active:bg-red-800
                active:scale-95
                transition-all duration-200
                text-white py-2 rounded-lg text-sm
              "
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* ===== Desktop View ===== */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm text-center mt-6">
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
            {state.topProduct.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="py-3">
                {products.length > 0 && (
                  <img
                    src={products[1].image}
                    alt={products[1].image}
                    className="h-16 w-16 object-contain mx-auto"
                  />
                )}
              </td>
                <td className="py-3">
                  <span
                    className={`${categoryStyle(product.Category)}
                    px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {product.Category}
                  </span>
                </td>

                <td className="py-3">{product.Stock}</td>

                <td className="py-3 font-semibold text-green-600">
                  {product.Price}
                </td>

                <td className="py-3">
                  <button
                    onClick={() =>
                      dispatch({ type: "ADD_PRODUCT", payload: product })
                    }
                    className="
                      bg-red-900
                      hover:bg-red-800
                      active:bg-red-800
                      active:scale-95
                      transition-all duration-200
                      text-white px-4 py-1.5
                      rounded-full text-xs
                    "
                  >
                    🛒 Add to cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TopProducts;
