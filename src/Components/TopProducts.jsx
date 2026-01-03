import { Link } from "react-router-dom";
import { useGlobal } from "../context/useGlobal";
import { useEffect, useState } from "react";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [cardDetails, setCardDetails] = useState(null);
  const { dispatch } = useGlobal();

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
    <div className="bg-white rounded-xl shadow-md mx-2 xs:mx-3 sm:mx-4 md:mx-5 p-4 xs:p-5 sm:p-6 my-6 xs:my-8 sm:my-10">
      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 xs:gap-4 mb-5 xs:mb-6">
        <h1 className="text-lg xs:text-xl sm:text-2xl md:text-2xl lgl:text-3xl font-bold text-gray-800 text-center sm:text-left">
          Top Products
        </h1>

        <Link
          to="/cart/1"
          className="bg-blue-900 hover:bg-blue-800 transition-all duration-200 text-white px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg text-xs xs:text-sm w-full sm:w-auto text-center"
        >
          Go to Cart
        </Link>
      </div>

      {/* ===== Mobile View (up to 500px) ===== */}
      <div className="space-y-3 xs:space-y-4 block sml:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-3 xs:p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
          >
            <div className="flex items-start gap-3 xs:gap-4 mb-3">
              <div className="flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-16 w-16 xs:h-20 xs:w-20 object-contain cursor-pointer bg-gray-50 p-1 rounded-lg"
                  onClick={() => setCardDetails(product)}
                />
              </div>
            
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-800 text-sm xs:text-base line-clamp-2 leading-tight mb-1">
                  {product.title}
                </h2>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm xs:text-lg font-bold text-green-600">
                    ${product.price}
                  </span>
                  
                  {product.rating && (
                    <span className="text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                      ⭐ {product.rating.rate}
                    </span>
                  )}
                </div>
                
                <span
                  className={`${categoryStyle(product.category)}
                  px-2 py-0.5 xs:px-3 xs:py-1 rounded-full text-[10px] xs:text-xs font-semibold inline-block`}
                >
                  {product.category}
                </span>
              </div>
            </div>
            
            <button
              onClick={() =>
                dispatch({ type: "ADD_PRODUCT", payload: product })
              }
              className="mt-3 w-full bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white py-2 rounded-lg text-sm font-medium"
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* ===== Small Tablet View (500px - 666px) ===== */}
      <div className="hidden sml:block md:hidden">
        <div className="grid grid-cols-2 gap-4 xs:gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div className="flex justify-center mb-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-24 w-24 object-contain cursor-pointer bg-gray-50 p-2 rounded-lg"
                  onClick={() => setCardDetails(product)}
                />
              </div>
              
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800 text-sm text-center line-clamp-2 leading-tight mb-2 min-h-[2.5rem]">
                  {product.title}
                </h2>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-green-600">
                      ${product.price}
                    </span>
                    
                    {product.rating && (
                      <span className="text-xs text-gray-600">
                        ⭐ {product.rating.rate}/5
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    <span
                      className={`${categoryStyle(product.category)}
                      px-3 py-1 rounded-full text-xs font-semibold truncate max-w-full`}
                    >
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() =>
                  dispatch({ type: "ADD_PRODUCT", payload: product })
                }
                className="mt-auto bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white py-2 rounded-lg text-sm font-medium w-full"
              >
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Tablet View (667px - 767px) ===== */}
      <div className="hidden md:block mdl:hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="py-3 px-3 text-center">Product</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Rating</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-14 w-14 object-contain cursor-pointer bg-gray-50 p-1 rounded flex-shrink-0"
                        onClick={() => setCardDetails(product)}
                      />
                      <span className="font-medium text-sm line-clamp-2">
                        {product.title}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`${categoryStyle(product.category)}
                      px-3 py-1 rounded-full text-xs font-semibold inline-block text-center min-w-[100px]`}
                    >
                      {product.category}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-semibold text-green-600 text-base">
                    ${product.price}
                  </td>

                  <td className="py-3 px-3">
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-medium">
                          {product.rating.rate}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({product.rating.count})
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <button
                      onClick={() =>
                        dispatch({ type: "ADD_PRODUCT", payload: product })
                      }
                      className="bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white px-4 py-1.5 rounded-lg text-xs font-medium"
                    >
                      🛒 Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Medium Tablet View (768px - 1023px) ===== */}
      <div className="hidden mdl:block lgl:hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="py-4 px-4 text-center">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-16 w-16 object-contain cursor-pointer bg-gray-50 p-2 rounded-lg flex-shrink-0"
                        onClick={() => setCardDetails(product)}
                      />
                      <span className="font-medium text-sm line-clamp-2 leading-snug">
                        {product.title}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <span
                        className={`${categoryStyle(product.category)}
                        px-4 py-1.5 rounded-full text-xs font-semibold text-center min-w-[120px]`}
                      >
                        {product.category}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-green-600 text-lg">
                    ${product.price}
                  </td>

                  <td className="py-4 px-4">
                    {product.rating && (
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-lg">⭐</span>
                          <span className="text-base font-bold">
                            {product.rating.rate}
                          </span>
                          <span className="text-sm text-gray-600">/5</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {product.rating.count} reviews
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <button
                          onClick={() =>
                            dispatch({
                              type: "ADD_PRODUCT",
                              payload: product,
                            })
                          }
                          className="bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white px-5 py-2 rounded-lg text-sm font-medium"
                        >
                          🛒 Add to cart
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Desktop View (1024px and above) ===== */}
      <div className="hidden lgl:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm lgl:text-base">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="py-5 px-6 text-center">Product</th>
                <th className="py-5 px-6 text-center">Category</th>
                <th className="py-5 px-6 text-center">Price</th>
                <th className="py-5 px-6 text-center">Rating</th>
                <th className="py-5 px-6 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition group">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-5">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-20 w-20 object-contain cursor-pointer bg-gray-50 p-2 rounded-xl group-hover:scale-105 transition-transform duration-200 flex-shrink-0"
                        onClick={() => setCardDetails(product)}
                      />
                      <span className="font-medium text-base leading-relaxed">
                        {product.title}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex justify-center">
                      <span
                        className={`${categoryStyle(product.category)}
                        px-5 py-2 rounded-full text-sm font-bold text-center min-w-[140px]`}
                      >
                        {product.category}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex justify-center">
                      <span className="font-bold text-green-600 text-xl">
                        ${product.price}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    {product.rating && (
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-yellow-500 text-xl">⭐</span>
                          <span className="text-xl font-bold">
                            {product.rating.rate}
                          </span>
                          <span className="text-lg text-gray-600">/5</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {product.rating.count} reviews
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex ">
                      <button
                          onClick={() =>
                            dispatch({
                              type: "ADD_PRODUCT",
                              payload: product,
                            })
                          }
                          className="bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white px-5 py-2 rounded-lg text-sm font-medium"
                        >
                          🛒 Add to cart
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Product Details Modal ===== */}
      {cardDetails && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 xs:p-3 sm:p-4"
          onClick={() => setCardDetails(null)}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full max-w-[90vw] xs:max-w-xs sm:max-w-sm md:max-w-md p-4 xs:p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-48 xs:h-52 sm:h-56 flex items-center justify-center mb-4 xs:mb-5">
              <img
                src={cardDetails.image}
                alt={cardDetails.title}
                className="h-full object-contain p-2 bg-gray-50 rounded-lg"
              />
            </div>

            
            <div className="flex justify-center mb-3">
              <span
                className={`${categoryStyle(cardDetails.category)}
                text-xs xs:text-sm uppercase tracking-wide px-4 xs:px-5 py-2 xs:py-2.5 rounded-full font-bold`}
              >
                {cardDetails.category}
              </span>
            </div>

            <h2 className="text-base xs:text-lg font-bold text-gray-800 text-center mb-3 leading-tight">
              {cardDetails.title}
            </h2>

            <p className="text-xs xs:text-sm text-gray-600 text-justify leading-relaxed line-clamp-4 xs:line-clamp-5 mb-5">
              {cardDetails.description}
            </p>

        
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl xs:text-2xl font-bold text-green-600">
                    ${cardDetails.price}
                  </span>
                  {cardDetails.rating && (
                    <div className="mt-1 flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium text-gray-700">
                        {cardDetails.rating.rate}/5
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({cardDetails.rating.count} reviews)
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() =>
                    dispatch({ type: "ADD_PRODUCT", payload: cardDetails })
                  }
                  className="bg-red-900 hover:bg-red-800 active:scale-95 transition-all duration-200 text-white px-5 py-2.5 rounded-lg text-sm font-bold"
                >
                  🛒 Add to Cart
                </button>
              </div>

              <button
                onClick={() => setCardDetails(null)}
                className="w-full bg-gray-200 hover:bg-gray-300 active:scale-95 transition-all duration-200 text-gray-800 py-2.5 rounded-lg text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopProducts;