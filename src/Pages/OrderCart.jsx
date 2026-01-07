import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderCart = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "Pending":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Failed":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="border border-gray-200 rounded-md p-4 lgl:p-5 xl:p-6 flex items-start gap-5 bg-white">
  {/* Image */}
  <div className="w-36 lgl:w-40 xl:w-44 flex-shrink-0 bg-gray-50 rounded-md flex items-center justify-center p-3">
    <img
      src={product.image}
      alt={product.title}
      className="h-28 lgl:h-32 xl:h-36 object-contain"
    />
  </div>

  {/* Content */}
  <div className="flex-1 flex flex-col gap-3">
    {/* Header */}
    <div className="flex justify-between items-center">
      <span className="font-semibold text-gray-700 text-sm xl:text-base">
        Order #{product.id}
      </span>

      <span
        className={`${getStatusColor(
          product.status
        )} px-3 py-1 rounded-full text-xs xl:text-sm font-medium`}
      >
        {product.status}
      </span>
    </div>

    {/* Title */}
    <h2 className="font-semibold text-gray-900 text-base xl:text-lg line-clamp-1">
      {product.title}
    </h2>

    {/* Description */}
    <p className="text-sm text-gray-600 line-clamp-2 xl:line-clamp-3">
      {product.description}
    </p>

    {/* Footer */}
    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
      <h3 className="font-bold text-green-600 text-base xl:text-lg">
        {product.price} $
      </h3>

      <p className="text-sm text-gray-500 capitalize">
        {product.category}
      </p>
    </div>
  </div>
</div>
  );
};

export default OrderCart;
