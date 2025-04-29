import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import PromototedCard from "./PromotedCard";
import Shimmer from "./Shimmer";
import { Link, useOutletContext } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // or use any other icon
import useOnlineStatus from "../src/utils/useOnlineStatus";

// size in px, color optional
const Body = () => {
  const { filteredRestaurants } = useOutletContext();
  const OnlineStatus = useOnlineStatus();
  const RestaurentPromototedCard = PromototedCard(RestaurantCard);
  if (OnlineStatus == false) return <div className="CheckOnine"><h1 className="OnlineStatues">Looks Like You are Offline</h1> <h2> Please check your Internet connection !!!</h2></div>;
  return filteredRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="res-conatiner">
        {filteredRestaurants.map((restaurant) => {
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
