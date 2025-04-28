import { useState,useEffect } from "react";
import { useLocation } from "react-router";

const Cart = () => {
  const location = useLocation();
  const cartItem = location.state?.cartItems || [];

  const cartItemsArray = Object.values(cartItem);
  const [cartItemFilter, usecartItemFilter] = useState(cartItemsArray);
  const [total, setTotal] = useState(0);   // Function to calculate the total price
   const calculateTotal = () => {
    let newTotal = cartItemFilter.reduce((acc, item) => {
      return acc + (item.price || item.defaultPrice) * item.quantity;
    }, 0);
    return newTotal
  };

  // Recalculate total when cartItemsArray or cartItemFilter changes
  useEffect(() => {
    const newTotal = calculateTotal();
    if (newTotal !== total) {
      setTotal(newTotal);  // Only update total if it has changed
    }
  }, [cartItemFilter]); // Only watch cartItemFilter as it holds the current items


  
  const removeItem = (cartItem) => {
    const updatedCartItems = cartItemFilter.map((item) => {
      if (item.id === cartItem.id && item.quantity > 1) {
        // Decrease quantity if it is greater than 1
        return { ...item, quantity: item.quantity - 1 };
      } else if (item.id === cartItem.id && item.quantity === 1) {
        // Remove the item entirely if quantity is 1
        return null;  // Or handle it differently if you want to remove the item instead of setting quantity to 0
      }
      return item;
    }).filter(item => item !== null); // Remove any null values (i.e., items that should be deleted)
  
    usecartItemFilter(updatedCartItems);
  };
  return (
    <div className="Cart">
      <h1>RushBite</h1>
      <h2>Shopping Cart</h2>

      {cartItemFilter.map((cartItem) => (
        <div className="cart-item" key={cartItem.id}>
          <div className="item-details">
            <h4>{cartItem.name}</h4>
            <p>₹{cartItem.price / 100 || cartItem.defaultPrice/100}</p>
          </div>
          <div className="item-qty">{cartItem.quantity}</div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
            alt="Remove"
            className="remove-icon"
            onClick={() => {
              removeItem(cartItem);
            }}
          />
        </div>
      ))}

      <div className="cart-summary">
        <p>
          Total: <strong>{calculateTotal()/100}</strong>
        </p>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
