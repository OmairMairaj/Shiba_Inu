import React from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import icon from "../../assets/logoicon.png";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import close from "../../assets/close.png";

function Navbar({ loggedIn, setLoggedIn }) {
  const [pressed, setPressed] = React.useState(false);
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
                <img
                  onClick={() => {
                    setPressed(true);
                  }}
                  className="user__icon"
                  src={icon}
                />
              </div>
            </div>
            {pressed ? (
              <div className="profileWhole">
                <img
                  className="profile__close"
                  src={close}
                  onClick={() => {
                    setPressed(false);
                  }}
                />
                <img className="profile__picture" src={icon} />
                <div className="profile__one__item">John Doe</div>
                <div className="profile__one__item">User</div>
                <div className="profile__one__item">
                  <div className="profile__one__subitem">
                    <div className="profile__one__boxleft">Email</div>
                    <div className="profile__one__boxright">john@doe.com</div>
                  </div>
                  <div className="profile__one__subitem">
                    <div className="profile__one__boxleft">Country</div>
                    <div className="profile__one__boxright">United Kingdom</div>
                  </div>
                  <div className="profile__one__subitem">
                    <div className="profile__one__boxleft">Points</div>
                    <div className="profile__one__boxright">1000</div>
                  </div>
                </div>
                <div
                  className="profile__one__item__logout"
                  onClick={() => {
                    setLoggedIn(false);
                  }}
                >
                  Logout
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
