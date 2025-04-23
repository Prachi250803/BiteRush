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

  // Fetch data when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/api/swiggy')  // Backend is running on localhost:3000
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Swiggy data:', data);
        setJson(data); // Save data in state
      })
      .catch(error => {
        console.error('Error fetching Swiggy data:', error);
      });
  }, []);
  
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