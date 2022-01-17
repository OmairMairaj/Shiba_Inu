import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Dropdown from "../Dropdown/Dropdown";
import Search from "../Search/Search";
import "./SearchBar.css"; 

function SearchBar({setUpperSearch}) {
  const [selected, setSelected] = useState("All");
  return (
    <div className="search__bar">
      <div className="searchContainer">
        <div className="form__group">
          <Dropdown
            className="dd"
            selected={selected}
            setSelected={setSelected}
          />
          <div className="search">
            <Search setUpperSearch={(val)=>{setUpperSearch(val)}}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
