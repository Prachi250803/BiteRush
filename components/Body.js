import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import PromototedCard from "./PromotedCard";
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
  const RestaurentPromototedCard = PromototedCard(RestaurantCard);
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
        {filteredListofres.map((restaurant) => {
          const ratingStr = restaurant?.info?.totalRatingsString;
          const ratingNumber = ratingStr
            ? parseFloat(ratingStr.replace("K+", "")) * 1000
            : 0;

          return (
            <Link
              key={restaurant?.info?.name}
              to={"/menu/" + restaurant?.info?.id}
              className="Link"
            >
              {ratingNumber > 50000 ? (
                <RestaurentPromototedCard resdata={restaurant} />
              ) : (
                <RestaurantCard resdata={restaurant} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
