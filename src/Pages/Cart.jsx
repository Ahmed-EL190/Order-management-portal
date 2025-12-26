import { useGlobal } from "../context/useGlobal";
const Cart = () => {
  const { state } = useGlobal();

  return (
    <div>
      <h2>Cart</h2>

      {state.cart.length === 0 && <p>Cart is empty</p>}

      {state.cart.map(item => (
        <div key={item.id}>
          <span>{item.ProductName}</span>
          <span> x {item.qty}</span>
        </div>
      ))}
    </div>
  );
};

export default Cart;
