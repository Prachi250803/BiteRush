import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import CartCount from "./CartCount";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [resInfo, setResInfo] = useState("");
  const [cartItems, setCartItems] = useState({}); // using object { id: quantity }

  const isLocalhost = window.location.hostname === "localhost";
  const API_BASE = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    const response = await fetch(
      resId
        ? `${API_BASE}/api/menu/${resId}`
        : `${API_BASE}/api/menu`
    );

    const json = await response.json();

    const resInfo = json?.data?.cards?.[2]?.card?.card?.info;
    setResInfo(resInfo);

    const cards =
      json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    const items = [];
    cards?.forEach((c) => {
      const itemCards = c.card?.card?.itemCards;
      const title = c.card?.card?.title;
      if (itemCards && title) {
        const group = {};
        group[title] = itemCards.map((item) => item?.card?.info);
        items.push(group);
      }
    });

    setMenuItems(items);
  };

  const addFood = (menuItem) => {
    
    setCartItems((prevCart) => {
      const existingItem = prevCart[menuItem.id];
  
      if (existingItem) {
        // If already added, just increase quantity
        return {
          ...prevCart,
          [menuItem.id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      } else {
        // Else add new item
        return {
          ...prevCart,
          [menuItem.id]: {
            ...menuItem,
            quantity: 1,
          },
        };
      }
      console.log(menuItem)
    });
  };
  

  const removeFood = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
  
      if (updated[itemId]) {
        if (updated[itemId].quantity > 1) {
          updated[itemId] = {
            ...updated[itemId],
            quantity: updated[itemId].quantity - 1,
          };
        } else {
          delete updated[itemId];
        }
      }
      return updated;
    });
  };
  
  const totalItems = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="menu">
      <div className="res-check-info">
        <div className="res-info">
          <h1>{resInfo?.name}</h1>
          <h3>
            {resInfo?.cuisines?.join(", ")} - {resInfo?.sla?.deliveryTime} mins
          </h3>
        </div>

        {totalItems > 0 && (
          <div className="Checkout">
            <Link to="/cart" state={{ cartItems}}>
              <button className="checkout-btn">
                Checkout ({totalItems})
              </button>
            </Link>
          </div>
        )}
      </div>

      {menuItems.length === 0 ? (
        <p>Loading menu or no items available...</p>
      ) : (
        <div>
          {menuItems.map((item, index) => {
            const category = Object.keys(item)[0];
            const items = item[category];
            return (
              <div key={index} className="menu-section">
                <h2 className="menu-category-title">{category}</h2>
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
                          ₹{menuItem.price / 100 || menuItem.defaultPrice/100}
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
