import React from "react";
import "./Navbar.css";
// import axios from "axios";
import icon from "../../assets/logoicon.png";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import close from "../../assets/close.png";

function Navbar({ data, setUpperSearch, check, setCheck }) {
  const [pressed, setPressed] = React.useState(false);

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo__area">
          <img alt="icon" className="icon" src={icon} alt="Icon" />
          <span className="iconText">SHIBA INU</span>
        </div>
        {sessionStorage.getItem("token") === null ? (
          <>
            <div className="search__area">
              <SearchBar
                setUpperSearch={(val) => {
                  setUpperSearch(val);
                }}
              />
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
              <SearchBar
                setUpperSearch={(val) => {
                  setUpperSearch(val);
                }}
              />
            </div>
            <div className="single__auth__button">
              <div
                className="profile__btn"
                onClick={() => {
                  setPressed(true);
                }}
              >
                <div>Hello, {`${data.name}`} </div>
                <img alt="icon" className="user__icon" src={icon} />
              </div>
            </div>
            {pressed ? (
              <div className="profileWhole">
                <img alt="icon"
                  className="profile__close"
                  src={close}
                  onClick={() => {
                    setPressed(false);
                  }}
                />
                <img alt="icon" className="profile__picture" src={icon} />
                <div className="profile__one__item">{`${data.name}`}</div>
                <div className="profile__one__item">{`${data.role}`}</div>
                <div className="profile__one__item">
                  <div className="profile__one__subitem">
                    <div className="profile__one__boxleft">Email</div>
                    <div className="profile__one__boxright">{`${data.email}`}</div>
                  </div>
                  <div className="profile__one__subitem">
                    <div className="profile__one__boxleft">Points</div>
                    <div className="profile__one__boxright">{`${data.rewardPoints}`}</div>
                  </div>
                </div>
                <div
                  className="profile__one__item__logout"
                  onClick={() => {
                    sessionStorage.clear();
                    setCheck(!check);
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
