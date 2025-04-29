import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link, useOutletContext } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // or use any other icon
import useOnlineStatus from "../src/utils/useOnlineStatus";

// size in px, color optional
const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [Input, setInput] = useState("");
  const [filteredListofres, setfilteredListOfres] = useState([]);
  const { json } = useOutletContext();
  const OnlineStatus = useOnlineStatus();
  useEffect(() => {
    if (json?.data?.cards) {
      const restaurants =
        json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setListOfRestaurant(restaurants);
      setfilteredListOfres(restaurants);
    }
  }, [json]);
  if (OnlineStatus == false) return <h1>Looks Like You are Offline </h1>;
  return filteredListofres.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="res-conatiner">
        {filteredListofres.map((restaurant) => (
          <Link
            key={restaurant?.info?.name}
            to={"/menu/" + restaurant?.info?.id}
            className="Link"
          >
            <RestaurantCard resdata={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
