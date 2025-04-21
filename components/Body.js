import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link,  useOutletContext} from "react-router-dom";
import { FaSearch } from 'react-icons/fa'; // or use any other icon

 // size in px, color optional
const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [Input, setInput] = useState("");
  const [filteredListofres, setfilteredListOfres] = useState([]);
  const { json } = useOutletContext();
  useEffect(() => {
    if (json?.data?.cards) {
      const restaurants =
        json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setListOfRestaurant(restaurants);
      setfilteredListOfres(restaurants);
    }
  }, [json]);
  if (listOfRestaurant == 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="res-conatiner">
        {filteredListofres.map((restaurant) => (
          <Link
            key={ restaurant?.info?.name}
            to={"/restaurants/" + restaurant?.info?.id}
            className="Link">
            <RestaurantCard resdata={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
