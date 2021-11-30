import React from "react";
import "./Slider.css"
function Slider(data) {
  const slider = () => {
    return data.data.map((marker) => (
      <div className="oneBox">
        {(marker.pictures.length!==0) ? <img className="onePicture" src={`${marker.pictures[0]}`}/>:<div className="NoPicture">No Image</div>}
        <p className="oneName">{marker.name}</p>
        <p className="oneAddress">{marker.address}</p>
      </div>
    ));
  };
  return <div className="sliderWhole"> {slider()} </div>;
}

export default Slider;