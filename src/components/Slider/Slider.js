import React from "react";
import "./Slider.css"
function Slider(data) {
  const slider = () => {
    return data.data.map((marker) => (
      <div className="oneBox">
        <p className="oneText">Name : {marker.name}</p>
        <p className="oneText">Address : {marker.address}</p>
      </div>
    ));
  };
  return <div className="sliderWhole"> {slider()} </div>;
}

export default Slider;
