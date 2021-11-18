import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

function Dropdown({ selected, setSelected }) {
  const wrapperRef = useRef(null);
  useEffect(() => {
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
  const [isActive, setIsActive] = useState(false);
  const options = [
    "Lorem Ipsum",
    "Lorem Ipsum@",
    "Lorem Ipsum$",
    "Lorem Ipsum#",
    "Lorem Ipsum*",
    "Lorem Ipsum Lorem",
  ];
  return (
    <div ref={wrapperRef} className="dropdown">
      <div className="dropdown__btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown__content">
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
