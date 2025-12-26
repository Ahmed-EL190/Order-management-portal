export const initialState = {
  cart: [],
  orderCart: [],
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

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return { ...state, cart: action.payload || [] };

    case "ADD_ORDER_TO_CART": {
      const add = state.orderCart.find(item => item.id === action.payload.id);
      if (add) {
        return {
          ...state,
          orderCart: state.orderCart.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        orderCart: [...state.orderCart, { ...action.payload, qty: 1 }],
      };
    }

    case "ADD_PRODUCT": {
      const add = state.cart.find(item => item.id === action.payload.id);
      if (add) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    }

    default:
      return state;
  }
};
