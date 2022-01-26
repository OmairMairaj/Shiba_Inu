import React from "react";
import "./Footer.css";
import facebook from "../../assets/facebook.png"
import instagram from "../../assets/instagram.png"
import twitter from "../../assets/twitter.png"

function Footer() {
  return (
    <div className="container">
      <div className="social_icons">
        <img className="one_icon" src={facebook} />
        <img className="one_icon" src={instagram} />
        <img className="one_icon" src={twitter} />
      </div>
    </div>
  );
}

export default Footer;
