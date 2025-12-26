import { useGlobal } from "../context/useGlobal";

const OrderCart = () => {
  const { state } = useGlobal();

  return (
    <div>
      <h2>Order Cart</h2>

      {state.orderCart.length === 0 && <p>Cart is empty</p>}

      {state.orderCart.map(order => (
        <div key={order.id}>
          <span>{order.id}</span>
          <span> - {order.customer}</span>
          <span> x {order.qty}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderCart;
