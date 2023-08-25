import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { AiOutlineSearch, AiFillApple, AiOutlineGoogle } from "react-icons/ai";
import { FaMicrosoft, FaSpotify, FaAmazon } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ gOrM }) => {
  let navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if(decodedToken.exp*1000<new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <div>
      <div className="header">
        <div className="search-container">
          <div className="search-icon">
            <AiOutlineSearch />
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search 8,000+ tutorials"
          />
        </div>
        <p className="logo">freeCodeCamp</p>
        <button className="menu-btn">Menu</button>
      </div>
      <div className="main-container">
        <strong>
          <div className="some-text1">Learn to code - for free.</div>
        </strong>
        <strong>
          <div className="some-text1">Build Projects.</div>
        </strong>
        <strong>
          <div className="some-text1">Earn Certifications</div>
        </strong>
        <bold>
          <div className="some-text2">
            Since 2014, more than 40,000 freeCodeCamp.org graduates have gotten
            <br></br> jobs at tech companies including:
          </div>
        </bold>
        <div className="icons-container">
          <AiFillApple className="icons" />
          <AiOutlineGoogle className="icons" />
          <FaMicrosoft className="icons" />
          <FaSpotify className="icons" />
          <FaAmazon className="icons" />
        </div>
        <button className="getstarted">Get started (it's free)</button>
      </div>
      <strong>
        <p>
          Please check the console when you log in all the details of the user
          logged in will be present there.Thankyou
        </p>
      </strong>
      {user ? (
        <div>
          {console.log(user)}

          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <button>
          <Link to="/auth">Sign in</Link>
        </button>
      )}
    </div>
  );
};

export default Navbar;
