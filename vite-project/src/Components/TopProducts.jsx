import { useReducer } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const TopProducts = () => {
  const initialState = {
    topProduct : [
    { id: 1,  ProductName: "Wireless Ergonomic Mouse",  Category: "Electronics",  Stock: 150,  Price: "$49.99",},
    { id: 2,  ProductName: "Noise-Cancelling deadphones",  Category: "Electronics",  Stock: 75,  Price: "$199.99",},
    { id: 3,  ProductName: "Organic Coffee Beans",  Category: "Groceries",  Stock: 200,  Price: "$18.50",},
    { id: 4,  ProductName: "Smart Home Security Camera",  Category: "Smart Home",  Stock: 90,  Price: "$120.00",},
    { id: 5,  ProductName: "Stainless Steel Wate Bottle",  Category: "Home Goods",  Stock: 300,  Price: "$25.00",},
  ]
  };
  const reducer = (state, action ) => {
    switch (action.type) {
      case "ADD_PRODUCT":
        return {...state, topProduct: [...state.topProduct , action.payload] } ;
        case "DELETE_PRODUCT":
        return { ...state , topProduct: state.topProduct.filter(TopProducts => TopProducts.id !== action.payload) } ;
      default:
        return state ;
    }
  }
  const [state, dispatch] = useReducer ( reducer, initialState  );
  const getCategoryColor = (Category) => {
    switch (Category) {
      case "Electronics":
        return "border";
      case "Groceries":
        return "border";
      case "Smart Home":
        return "border";
      case "Home Goods":
        return "border";
      default:
        break;
    }
  };
  return (
    <div className="font-semibold bg-white rounded-lg shadow-sm mx-5 p-5 ">
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-5">
        Top Products
      </h1>
      <hr className="mb-5" />
      <table className="w-full text-center text-xs sm:text-sm md:text-base table-fixed">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="py-2 px-1 sm:py-3 sm:px-2 xs:text-xs">
              Product Name
            </th>
            <th className="py-2 px-1 sm:py-3 sm:px-2 xs:text-xs">Category</th>
            <th className="py-2 px-1 sm:py-3 sm:px-2 xs:text-xs">Stock</th>
            <th className="py-2 px-1 sm:py-3 sm:px-2 xs:text-xs">Price</th>
            <th className="py-2 px-1 sm:py-3 sm:px-2 xs:text-xs">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {state.topProduct.map((topProducts, id) => (
            <tr key={id} className="hover:bg-gray-50 transition">
              <td className="py-2 px-1 sm:py-3 sm:px-2 ">
                {topProducts.ProductName}
              </td>
              <td className="py-2 px-1 sm:py-3 sm:px-2">
                <span
                  className={`${getCategoryColor(
                    topProducts.Category
                  )} text-black px-2 py-1 rounded-full text-[10px] sm:text-xs`}
                >
                  {topProducts.Category}
                </span>
              </td>
              <td className="py-2 px-1 sm:py-3 sm:px-2">{topProducts.Stock}</td>
              <td className="py-2 px-1 sm:py-3 sm:px-2">{topProducts.Price}</td>
              <td className="py-2 px-1 sm:py-3 sm:px-2 flex justify-center">
                <BsThreeDotsVertical 
               onClick ={() =>dispatch ({type: "DELETE_PRODUCT", payload:topProducts.id}) }
                className="text-gray-600 cursor-pointer hover:text-gray-900 text-sm sm:text-base" />
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
