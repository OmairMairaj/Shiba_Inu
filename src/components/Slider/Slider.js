import React from "react";
import "./Slider.css";
import left from "../../assets/left.png";
import right from "../../assets/right.png";
import NoPicture from "../../assets/no-pictures.png";

function Slider({ data, select, setSelect }) {
  const ref = React.useRef(null);
  const [myID, setmyID] = React.useState(830);
  const slider = () => {
    return data.map((marker) =>
      select && select.id === marker._id ? (
        <div
          className="oneBox"
          id={`${marker._id}`}
          style={{ backgroundColor: "#ff8400", border: "2px solid white" }}
        >
          {marker.images !== "" ? (
            <img className="onePicture" src={`${marker.images}`} />
          ) : (
            <img className="NoPicture" src={NoPicture} />
          )}
          <div>
            <span className="oneName">{marker.place_name}</span>
          </div>
          <div>
            <span className="oneAddress">{marker.desc}</span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            scrollClick(marker._id);
            setSelect(marker);
          }}
          id={`${marker._id}`}
          className="oneBox"
        >
          {marker.images !== "" ? (
            <img className="onePicture" src={`${marker.images}`} />
          ) : (
            <img className="NoPicture" src={NoPicture} />
          )}
          <div>
            <span className="oneName">{marker.place_name}</span>
          </div>
          <div>
            <span className="oneAddress">{marker.desc}</span>
          </div>
        </div>
      )
    );
  };
  const scroll = (scrollOffset) => {
    if (scrollOffset > 0) {
      //console.log(myID);
      ref.current.scrollLeft += myID;
    } else ref.current.scrollLeft -= myID;
  };
  const scrollClick = (id) => {
    document.getElementById(id).scrollIntoView({ block: "end" });
  };
  return (
    <div className="sliderContainer">
      <div className="sliderHeader">Places near you</div>
      <div className="sliderWhole">
        <img
          className="sliderIcon"
          onClick={() => {
            scroll(-3);
          }}
          src={left}
        />
        <div className="slider" ref={ref}>
          {slider()}
        </div>
        <img
          className="sliderIcon"
          onClick={() => {
            scroll(3);
          }}
          src={right}
        />
      </div>
    </div>
  );
}

export default Slider;
