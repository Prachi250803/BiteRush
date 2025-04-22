import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {Link} from 'react-router-dom'

const RestaurantMenu = () => {
  const { resId } = useParams(); // ✅ Destructure to get the ID as string
  const [menuItems, setMenuItems] = useState([]);
  const [resInfo, setResInfo] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, [resId]); // ✅ Adding resId as dependency to reload menu when resId changes

  const fetchMenu = async () => {
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
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
        group[title] = itemCards.map((item) => item?.card?.info); // extract only 'info' if needed
        items.push(group);
      }
    });

    setMenuItems(items);
  };

  const addfood = (menuItem) => {
    setCartItems(prev => [...prev, menuItem]);
  };
  console.log(cartItems)
  return (
    <div className="menu">
       <div className="Checkout">
          <Link to="/cart" state={{ cartItems }}><button className="checkout-btn">
            Checkout
          </button> </Link>
        </div>
      <div className="res-info">
        <h1>{resInfo?.name}</h1>
        <h3>
          {resInfo?.cuisines?.join(", ")} - {resInfo?.sla?.deliveryTime} mins
        </h3>
      </div>
      {menuItems.length === 0 ? (
        <p>Loading menu or no items available...</p>
      ) : (
        <div>
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
                        <p className="menu-item-price">₹{menuItem.price/100}</p>
                        <button className="menu-add-btn" onClick={()=>{
                          console.log('clicked')
                          addfood(menuItem)
                        }} >Add</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
