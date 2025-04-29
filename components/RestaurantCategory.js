import ItemList from "./ItemList";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const RestaurantCategory = ({ item, cartItems, addFood, removeFood }) => {
  const [showItems, setShowItems] = useState(false);
  const category = Object.keys(item)[0];
  const itemdata = item[category];

  return (
    <div className="Accordian-parent">
      <div className="Accordian">
        <span>
          {category} ({category.length})
        </span>
        <button
          onClick={() => setShowItems((prev) => !prev)}
          className="Accordian-button"
        >
          {showItems ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {showItems && (
        <ItemList
          items={itemdata}
          cartItems={cartItems}
          addFood={addFood}
          removeFood={removeFood}
        />
      )}
    </div>
  );
};

export default RestaurantCategory;
