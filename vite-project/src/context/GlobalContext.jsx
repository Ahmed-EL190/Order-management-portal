import { createContext, useReducer, useContext } from "react";

const GlobalContext = createContext();

const initialState = {
  orders: [
    { id: "ORD001", customer: "Alice", stock: 150, price: "$250.00", status: "Delivered" },
    { id: "ORD002", customer: "Bob", stock: 75, price: "$120.50", status: "Pending" },
    { id: "ORD003", customer: "Charlie", stock: 200, price: "$50.00", status: "Delivered" },
    { id: "ORD004", customer: "Diana", stock: 90, price: "$75.25", status: "Failed" },
    { id: "ORD005", customer: "Eve", stock: 300, price: "$300.00", status: "Delivered" },
  ],

  topProduct: [
    { id: 1, ProductName: "Wireless Mouse", Category: "Electronics", Stock: 150, Price: "$49.99" },
    { id: 2, ProductName: "Noise Headphones", Category: "Electronics", Stock: 75, Price: "$199.99" },
    { id: 3, ProductName: "Wireless Mouse", Category: "Electronics", Stock: 870, Price: "$87.99" },
    { id: 4, ProductName: "Noise Headphones", Category: "Electronics", Stock: 350, Price: "$34.99" },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return { 
        ...state,orders: [...state.orders, action.payload] 
      };

    case "DELETE_ORDER":
      return { 
        ...state,orders: state.orders.filter(order => order.id !== action.payload) 
      };

    case "ADD_PRODUCT":
      return { 
        ...state,topProduct: [...state.topProduct, action.payload] 
      };

    case "DELETE_PRODUCT":
      return { 
        ...state,topProduct: state.topProduct.filter(product => product.id !== action.payload) 
      };

    default:
      return state;
    }};
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
