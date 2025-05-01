import ItemList from "./ItemList";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const RestaurantCategory = ({ item, cartItems, addFood, removeFood ,showItems, setShowIndex }) => {
  const category = Object.keys(item)[0];
  const itemdata = item[category];
  const handleClick = () =>{
    setShowIndex()
  }

  return (
    <div className="Accordian-parent">
      <div className="Accordian"  onClick={ handleClick}>
        <span>
          {category} ({category.length})
        </span>
        <button
       
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
