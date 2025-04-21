import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Header from '../components/Header'
import Body from '../components/Body'
import About from '../components/About'
import Cart from '../components/Cart'
import Contact from '../components/Conatct'
import Error from '../components/RestaurantMenu'
import RestaurantMenu from '../components/RestaurantMenu'
import { useEffect , useState } from "react";

const AppLayout = () => {
    const [json, setJson] = useState(null);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const jsonData = await data.json();
      setJson(jsonData);
    };
  
    return (
      <div className="app">
        <Header json={json}/>
        {json && <Outlet context={{ json }} />}
      </div>
    );
  };
  
const AppRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
                path:"/",
                element:<Body/>
            },
            {
                path:"/about",
                element:<About/>
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/cart",
                element:<Cart/>
            },
            {
                path:"/restaurants/:resId",
                element:<RestaurantMenu/>
            }
        ],
        errorElement:<Error/>
    },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={AppRouter}/>);