import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "../components/Header";
import Body from "../components/Body";
import About from "../components/About";
import Cart from "../components/Cart";
import Contact from "../components/Conatct";
import Error from "../components/Error";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const [json, setJson] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.REACT_APP_API_URL || "";  // Fallback to environment variable

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/swiggy`);
      const data = await res.json();
      const listOfRestaurant = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      setJson(listOfRestaurant);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  }, [json]);

  const RestaurantMenu = lazy(()=> import( "../components/RestaurantMenu"))
  return (
    <div className="app">
      <Header json={json} onSearch={setFilteredRestaurants}  />
      {json && <Outlet context={{ filteredRestaurants }} />}
    </div>
  );
};

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/menu/:resId",
        element: 
        <Suspense fallback={<div>Loading Menu...</div>}>
        <RestaurantMenu />,
        </Suspense>
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={AppRouter} />);
