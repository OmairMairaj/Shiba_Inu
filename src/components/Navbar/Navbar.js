import React from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import icon from "../../assets/logoicon.png";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

function Navbar({ loggedIn, setLoggedIn }) {
  const [pressed , setPressed] = React.useState(false)
  const [viewProfile, setViewProfile] = React.useState(false);
  console.log(viewProfile);
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo__area">
          <img className="icon" src={icon} alt="Icon" />
          <span className="iconText">SHIBA INU</span>
        </div>
        {loggedIn === false ? (
          <>
            <div className="search__area">
              <SearchBar />
            </div>
            <div className="auth__buttons">
              <Link to="/login" className="login__btn">
                <div>Login</div>
              </Link>
              <Link to="/signup" className="signup__btn">
                <div>Sign Up</div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="search__area">
              <SearchBar />
            </div>
            <div className="single__auth__button">
              <div className="profile__btn">
                <div>Hello, FirstName</div>
                <img onClick={()=>{setPressed(!pressed)}} className="user__icon" src={icon} />
              </div>
            </div>
            {pressed ? (
              <div className="profileWhole">
                <div className="profile__one__item">Name : John Doe</div>
                <div className="profile__one__item">Reward Points : 1000</div>
                <div className="profile__one__item">Role : User</div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
