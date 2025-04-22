import { useEffect, useState } from "react";
import { useParams } from "react-router";

const RestaurantMenu = () => {
  const { resId } = useParams(); // ✅ Destructure to get the ID as string
  const [menuItems, setMenuItems] = useState([]);
  const [resInfo, setResInfo] = useState("");

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

    console.log('cards', cards);

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

  return (
    <div className="menu">
      <h1>{resInfo?.name}</h1>
      <h3>{resInfo?.cuisines?.join(", ")}</h3>
      {menuItems.length === 0 ? (
        <p>Loading menu or no items available...</p>
      ) : (
        <ul>
          {menuItems.map((item, index) => {
            const category = Object.keys(item)[0]; // Get the category name
            const items = item[category];

            return (
              <li key={index}>
                <strong>Category: {category}</strong>
                <ul>
                  {items.map((menuItem, idx) => (
                    <li key={idx}>
                      {menuItem.name} - {menuItem.price} rs
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RestaurantMenu;
