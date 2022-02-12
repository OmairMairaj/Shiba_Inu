import React from "react";
import "./Footer.css";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";

function Footer() {
  return (
    <div className="container">
      <div className="social_icons">
        <img alt="facebook" className="one_icon" src={facebook} />
        <img alt="instagram" className="one_icon" src={instagram} />
        <img alt="twitter" className="one_icon" src={twitter} />
      </div>
    </div>
  );
}

export default Footer;
