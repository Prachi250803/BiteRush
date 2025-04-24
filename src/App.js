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
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/swiggy");
      const data = await res.json();
      setJson(data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };
  
  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log("Fetched JSON:", json);
  }, [json]);
  
  
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