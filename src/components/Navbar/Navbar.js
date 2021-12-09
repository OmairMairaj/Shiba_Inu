import React from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import icon from "../../assets/logoicon.png";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo__area">
          <img className="icon" src={icon} alt="Icon" />
          <span className="iconText">SHIBA INU</span>
        </div>
        <div className="search__area">
          <SearchBar />
        </div>
        <div className="auth__buttons">
          <Link to="/login" className="login__btn"><div>Login</div></Link>
          <Link to="/signup" className="signup__btn"><div>Sign Up</div></Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
