import React from "react";

const CartCount = ({ menuItem, quantity, addFood, removeFood }) => {
  return (
    <div className="cart-count">
        
      {quantity > 0 ? (
        <div className="count-controls">
          <button onClick={() => removeFood(menuItem)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => addFood(menuItem)}>+</button>
        </div>
      ) : (
        <button onClick={() => addFood(menuItem)} className="add-btn">
          ADD
        </button>
      )}
    </div>
  );
};

export default CartCount;
