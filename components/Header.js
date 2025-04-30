import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../src/firebase";
import { FaSearch } from "react-icons/fa";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

const Header = (props) => {
  const [Input, setInput] = useState("");
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  const handleSearch = () => {
    const filtered = props.json.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(Input.toLowerCase())
    );
    props.onSearch(filtered);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [Input, props.json]);

  useEffect(() => {
    if (isSignupOpen || showLogin) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Clean up on unmount
    return () => document.body.classList.remove("no-scroll");
  }, [isSignupOpen, showLogin]);

  const handleLogout = async () => {
    await signOut(auth);
    setShowLogout(false);
  };

  return (
    <div className="Header">
      <div className="search-nav">
        <div className="logo-conatiner">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpEakNrR65pHxi5PX2Ukq3LDrEIm0YrbejiA&s"
            width="100px"
            height="100px"
            alt="logo"
          />
        </div>

        <div className="SearchConatiner">
          <input
            type="text"
            className="Search-box"
            value={Input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            <FaSearch size={20} color="#6B7280" />
          </button>
        </div>
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
        </ul>

        <div className="SignupLogin">
          {!user ? (
            <>
              <button onClick={() => setIsSignupOpen(true)}>Sign Up</button>
              <SignupModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
              />

              <button onClick={() => setShowLogin(true)}>Login</button>
              <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
              />
            </>
          ) : (
            <>
              <button>{user.displayName || user.email}</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
