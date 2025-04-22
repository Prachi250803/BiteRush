import { useLocation } from "react-router";

const Cart = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="Cart">
      <h1>RushBite</h1>
      <h2>Shopping Cart</h2>

      {cartItems.map((cartItem) => (
        <div className="cart-item" key={cartItem.id}>
          <div className="item-details">
            <h4>{cartItem.name}</h4>
            <p>₹{cartItem.price / 100}</p>
          </div>
          <div className="item-qty">x1</div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
            alt="Remove"
            className="remove-icon"
          />
        </div>
      ))}

      <div className="cart-summary">
        <p>
          Total: <strong>{total/100}</strong>
        </p>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
