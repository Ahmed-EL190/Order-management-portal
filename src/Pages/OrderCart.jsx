import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderCart = () => {
  const { id } = useParams(); // 👈 id من الرابط
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
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-gray-800 text-sm xs:text-base">
          Order #{product.id}
        </span>
        <span
          className={`${getStatusColor(
            product.status
          )} px-2 py-0.5 xs:px-3 xs:py-1 rounded-full text-[10px] xs:text-xs font-semibold`}
        >
          {product.status}
        </span>
      </div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <h3>{product.price} $</h3>
      <p>{product.category}</p>
    </div>
  );
};

export default OrderCart;
