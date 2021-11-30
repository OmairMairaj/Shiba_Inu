import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Dropdown from "../Dropdown/Dropdown";
import "./SearchBar.css";

function SearchBar() {
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [place, setPlace] = useState();
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
            <input
              type="text"
              className="search__input"
              placeholder="Search for a place...."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            ></input>
          </div>
          <button className="btn" type="submit">
            <FaSearch className="fa-search" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
