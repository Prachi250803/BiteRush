import CartCount from "./CartCount";
const ItemList = ({ items, cartItems, addFood, removeFood }) => {
  return (
    <div className="menu">
      <div className="menu-section">
        <div className="menu-items-list">
          {items.map((menuItem, idx) => (
            <div key={idx} className="menu-item-card">
              <img
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                  menuItem.imageId
                }
                alt={menuItem.name}
                className="menu-item-image"
              />
              <div className="menu-item-content">
                <h3 className="menu-item-name">{menuItem.name}</h3>
                <p className="menu-item-desc">{menuItem.description}</p>
                <p className="menu-item-price">
                  ₹{menuItem.price / 100 || menuItem.defaultPrice / 100}
                </p>

                <CartCount
                  menuItem={menuItem}
                  quantity={cartItems[menuItem.id]?.quantity || 0}
                  addFood={addFood}
                  removeFood={removeFood}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemList