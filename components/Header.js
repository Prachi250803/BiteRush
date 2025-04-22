import { useState , useEffect } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'; // or use any other icon


const Header = (props) => {
    const [btnName,setbtnName] = useState('Login')
    const [Input, setInput] = useState("");
    const [filteredListofres, setfilteredListOfres] = useState([]);
    const [listOfRestaurant, setListOfRestaurant] = useState([]);
    
    const clicked = () =>{
        btnName=='Login' ? setbtnName("Logout") : setbtnName("Login")
    }
    useEffect(() => {
        if (props?.json?.data?.cards) {
          const restaurants =
            props?.json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants || [];
    
          setListOfRestaurant(restaurants);
          setfilteredListOfres(restaurants);
        }
       
      }, []);
      useEffect(() => {
      }, [listOfRestaurant, filteredListofres, Input]);
      
    return (
    <div className="Header">
        <div className="logo-conatiner">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpEakNrR65pHxi5PX2Ukq3LDrEIm0YrbejiA&s" width="100px" height="100px"></img>
        </div>
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
                    onClick={() => {
                        const filteredListOfres = listOfRestaurant.filter((res) =>
                          res.info.name.toLowerCase().includes(Input.toLowerCase())
                        );
                        setfilteredListOfres(filteredListOfres);
                      }}
                  >
                    <FaSearch size={20} color="#6B7280" />
                  </button>
                </div>
        <div className='nav-items'>
            <ul>
                <li> <Link to="/"> Home</Link></li>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <button onClick={()=>{clicked()}}>
                    {btnName}
                </button>
            </ul>
        </div>
    </div>
    )
}

export default Header