import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.css";
import axios from "axios";

function Dropdown({ selected, setSelected }) {
  const [options, setOptions] = React.useState(["All"]);
  const [data, setData] = React.useState();
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
        for (var i = 0; i < arr.length; i++) {
          options.push(arr[i]);
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
    <div ref={wrapperRef} className="dropdown">
      <div className="dropdown__btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown__contentdrawer ">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown__item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Dropdown;
