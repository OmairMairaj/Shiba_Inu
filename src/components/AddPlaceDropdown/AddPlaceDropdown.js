import React, { useEffect, useRef, useState } from "react";
import "./AddPlaceDropdown.css";
import axios from "axios";

function AddPlaceDropdown({ cat, setCat }) {
  const [options] = React.useState(["All"]);
  const [isActive, setIsActive] = useState(false);
  const wrapperRef = useRef(null);
  
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //API Call
  const getData = async () => {
    await axios
      .get(""+ process.env.REACT_APP_BACKEND_URL + "/api/categories/getcategories")
      .then((response) => {
        let arr = [];
        for (var i = 0; i < response.data.data.length; i++) {
          arr.push(response.data.data[i].name);
        }
        arr = arr.sort();
        for (var j = 0; j < arr.length; j++) {
          options.push(arr[j]);
        }
        // console.log(options);
      });
  };
  
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //Use Effect
  useEffect(() => {
    getData();
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //Return
  return (
    <div ref={wrapperRef} className="AddPlace_dropdown">
      <div className="AddPlace_dropdown__btn" onClick={(e) => setIsActive(!isActive)}>
        {cat}
        {(isActive) ? <span>X</span> : <span style={{fontWeight:"bold"}}>V</span>}
      </div>
      {isActive && (
        <div className="AddPlace_dropdown__contentdrawer ">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setCat(option);
                setIsActive(false);
              }}
              className="AddPlace_dropdown__item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default AddPlaceDropdown;
