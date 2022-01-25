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
            <span className="oneAddress">Category : {marker.desc}</span>
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
            <span className="oneAddress">Category : {marker.desc}</span>
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
      {data.length > 0 ? (
        <>
          <div className="sliderHeader">Places near you</div>
          <div className="sliderWhole">
            {data.length > 3 ? (
              <img
                className="sliderIcon"
                onClick={() => {
                  scroll(-3);
                }}
                src={left}
              />
            ) : null}
            <div className="slider" ref={ref}>
              {slider()}
            </div>
            {data.length > 3 ? (
              <img
                className="sliderIcon"
                onClick={() => {
                  scroll(3);
                }}
                src={right}
              />
            ) : null}
          </div>
        </>
      ) : (
        <div className="sliderHeader">No places found near your location</div>
      )}
    </div>
  );
}

export default Slider;
