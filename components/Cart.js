const Cart = () => {
  return (
    <div className="Cart">
        <h1>RushBite</h1>
        <h2>Shooping Cart</h2>
      <div className="cart-item">
        <div className="item-details">
          <h4>Cheesy Burger</h4>
          <p>₹199</p>
        </div>
        <div className="item-qty">x1</div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
          alt="Remove"
          className="remove-icon"
        />
      </div>

      <div className="cart-summary">
        <p>
          Total: <strong>₹199</strong>
        </p>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
