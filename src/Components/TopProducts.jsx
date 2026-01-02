import { Link } from "react-router-dom";
import { useGlobal } from "../context/useGlobal";
import { useEffect, useState } from "react";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [cardDetails, setCardDetails] = useState(null);
  const {  dispatch } = useGlobal();

  // ===== Fetch Products =====
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getProducts();
  }, []);

  // ===== Category Style =====
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
          to="/cart/1"
          className="bg-blue-900 hover:bg-blue-800 transition text-white px-4 py-2 rounded-lg text-sm"
        >
          Go to Cart
        </Link>
      </div>

      {/* ===== Mobile View ===== */}
      <div className="space-y-4 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={product.image}
                alt={product.title}
                className="h-16 w-16 object-contain cursor-pointer"
                onClick={() => setCardDetails(product)}
              />

              <div className="flex-1">
                <h2 className="font-semibold text-gray-800 truncate">
                  {product.title}
                </h2>

                <span className="text-sm font-bold text-green-600">
                  ${product.price}
                </span>
              </div>
            </div>

            <p className="text-sm">
              <span
                className={`${categoryStyle(product.category)}
                px-2 py-0.5 rounded-full text-xs font-semibold`}
              >
                {product.category}
              </span>
            </p>

            <button
              onClick={() =>
                dispatch({ type: "ADD_PRODUCT", payload: product })
              }
              className="mt-4 w-full bg-red-900 hover:bg-red-800 transition text-white py-2 rounded-lg text-sm"
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
              <th className="py-3">Price</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="py-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-16 w-16 object-contain mx-auto cursor-pointer"
                    onClick={() => setCardDetails(product)}
                  />
                </td>

                <td className="py-3">
                  <span
                    className={`${categoryStyle(product.category)}
                    px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {product.category}
                  </span>
                </td>

                <td className="py-3 font-semibold text-green-600">
                  ${product.price}
                </td>

                <td className="py-3">
                  <button
                    onClick={() =>
                      dispatch({ type: "ADD_PRODUCT", payload: product })
                    }
                    className="bg-red-900 hover:bg-red-800 transition text-white px-4 py-1.5 rounded-full text-xs"
                  >
                    🛒 Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Product Details Modal ===== */}
      {cardDetails && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setCardDetails(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-80 md:w-[28rem] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={cardDetails.image}
              alt={cardDetails.title}
              className="h-56 mx-auto object-contain mb-4"
            />

            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              {cardDetails.category}
            </span>

            <h2 className="font-bold mt-3">{cardDetails.title}</h2>

            <p className="text-xs text-gray-600 mt-2">
              {cardDetails.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-green-600">
                ${cardDetails.price}
              </span>
            </div>

            <button
              onClick={() => setCardDetails(null)}
              className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopProducts;
