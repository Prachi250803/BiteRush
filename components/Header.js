import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'; // or use any other icon


const Header = (props) => {
    const [btnName,setbtnName] = useState('Login')
    const [Input, setInput] = useState("");
    const [filteredRestaurants, setFilteredRestaurants] = useState([props.json]);
 
     
    const handleSearch = () => {
      const filtered = props.json.filter((restaurant) =>
        restaurant.info.name.toLowerCase().includes(Input.toLowerCase())
      );
      props.onSearch(filtered); // Update parent
    };
  
    useEffect(() => {
      const debounceTimeout = setTimeout(() => {
        handleSearch();
      }, 500);
  
      return () => clearTimeout(debounceTimeout);
    }, [Input, props.json]);
      
    return (
    <div className="Header">
        <div className="logo-conatiner">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpEakNrR65pHxi5PX2Ukq3LDrEIm0YrbejiA&s" width="100px" height="100px"></img>
        </div>
        <div className='search-nav'>
         <div className="SearchConatiner">
                  <input
                    type="text"
                    className="Search-box"
                    value={Input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
                  ></input>
                  <button
                    className="search-btn"
                    onClick={handleSearch}
                  >
                    <FaSearch size={20} color="#6B7280" />
                  </button>
                </div>
        <div className='nav-items'>
            <ul>
                <li> <Link to="/"> Home</Link></li>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
            </ul>
        </div>
        </div>
    </div>
    )
}

export default Header