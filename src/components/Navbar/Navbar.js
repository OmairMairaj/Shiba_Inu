import React from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import icon from "../../assets/logoicon.png";
import SearchBar from "../SearchBar/SearchBar";

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
          <div className="login__btn">Login</div>
          <div className="signup__btn">Sign Up</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
