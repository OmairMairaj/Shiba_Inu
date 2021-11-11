import React from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import icon from "../../favicon.ico";

function Home() {
  return (
    <div className="header">
      <img src={icon} alt="Icon" />
      <span className="iconText">SHIBA INU</span>
      <div className="searchContainer">
        <div className="searchText1">Lorem Ipsum</div>
        <div className="searchText2">
          <FaSearch /> Lorem Ipsum
        </div>
      </div>
      <div className="RBOXContainer">
        <div className="RBOX searchText1">Login</div>
        <div className="RBOX searchText1">Sign Up</div>
      </div>
    </div>
  );
}

export default Home;
