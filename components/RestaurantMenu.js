import { useEffect, useState } from "react";
import { useParams } from "react-router";

const RestaurantMenu = () => {
  const { resId } = useParams(); // ✅ Destructure to get the ID as string
  const [menuItems, setMenuItems] = useState([]);
  const [resInfo, setresInfo] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
    );

    const json = await response.json();

    const resInfo = json?.data?.cards?.[2]?.card?.card?.info;
    setresInfo(resInfo);

    const cards =
      json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    const items = [];

    cards?.forEach((c) => {
      if (c.card?.card?.itemCards) {
        items.push(...c.card.card.itemCards);
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
          {menuItems.map((item,index) => (
            <li key={`${item.card.info.id}-${index}`}>
              {item.card.info.name} - ₹
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantMenu;
