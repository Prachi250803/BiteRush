import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import CartCount from "./CartCount";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [resInfo, setResInfo] = useState("");
  const [cartItems, setCartItems] = useState({}); // using object { id: quantity }
  const [showIndex , setShowIndex] = useState(null)

  const isLocalhost = window.location.hostname === "localhost";
  const API_BASE =
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";
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
    });
  };
  const removeFood = (menuItem) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (updated[menuItem.id]) {
        if (updated[menuItem.id].quantity > 1) {
          updated[menuItem.id] = {
            ...updated[menuItem.id],
            quantity: updated[menuItem.id].quantity - 1,
          };
        } else {
          delete updated[menuItem.id];
        }
      }
      return updated;
    });
  };

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    const response = await fetch(
      resId ? `${API_BASE}/api/menu/${resId}` : `${API_BASE}/api/menu`
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

  const totalItems = Object.values(cartItems).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className=" Accordian-wrapper">
       {totalItems > 0 && (
          <div className="Checkout">
            <Link to="/cart" state={{ cartItems}}>
              <button className="checkout-btn">
                Checkout ({totalItems})
              </button>
            </Link>
          </div>
        )}
      {menuItems.length === 0 ? (
        <p>Loading menu...</p>
      ) : (
        menuItems.map((item, index) => (
          <RestaurantCategory
            key={index}
            item={item}
            cartItems={cartItems}
            addFood={addFood}
            removeFood={removeFood}
            showItems={showIndex === index}
            setShowIndex={() =>
              setShowIndex(showIndex === index ? null : index)
            }
          />
        ))
      )}
    </div>
  );
};

export default RestaurantMenu;
