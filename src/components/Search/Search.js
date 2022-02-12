import React, { useRef, useState } from "react";
import "./Search.css";
import axios from "axios";
import cross from "../../assets/close.png";
import search from "../../assets/search.png";

function Search({ selected, setUpperSearch }) {
  let [data, setData] = React.useState([]);
  let [searchField, setSearchField] = React.useState("");
  const [isActive, setIsActive] = useState(false);
  const wrapperRef = useRef(null);
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //API Call
  const getData = async () => {
    await axios
      .get(
        "" + process.env.REACT_APP_BACKEND_URL + "/api/places/getapprovedplaces"
      )
      .then((response) => {
        setData(response.data.data);
      });
  };

  React.useEffect(
    (e) => {
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
    },
    [wrapperRef]
  );

  const getIcon = () => {
    if (searchField !== "") {
      return (
        <img
          alt="icon"
          onClick={() => {
            setSearchField("");
          }}
          class="search_icon"
          src={cross}
        />
      );
    } else return <img alt="icon" class="search_icon" src={search} />;
  };

  const searchResults = () => {
    let All;
    if (selected !== "All") {
      All = data.filter((item) =>
        item.category.toLowerCase().includes(selected.toLowerCase())
      );
    } else {
      All = data;
    }
    All = All.filter((item) =>
      item.place_name.toLowerCase().includes(searchField.toLowerCase())
    );
    if (All.length > 0) {
      All = All.slice(0, 5);
      return (
        <div className="results__search">
          {All.map((item) => {
            return (
              <div
                onClick={() => {
                  setUpperSearch(item);
                  setSearchField("");
                }}
                className="oneSearch"
              >
                <img
                  alt="icon"
                  style={{ width: "22%", margin: "2px 4px 0px 0" }}
                  src={item.images}
                />
                <div className="allText">
                  <div>
                    <span className="text">{item.place_name}</span>
                  </div>
                  <div className="smalltext">
                    <span>{item.desc}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="results__search">
          <p className="oneSearch text">No Results Found</p>
        </div>
      );
    }
  };

  return (
    <div ref={wrapperRef}>
      <div className="searchWhole">
        <input
          className="product__search"
          type="text"
          placeholder="Search for a place..."
          value={searchField}
          onChange={(e) => {
            setIsActive(true);
            setSearchField(e.target.value);
          }}
        />
        {getIcon()}
      </div>
      <div className="resultBox__search">
        {isActive && searchField !== "" ? searchResults() : null}
      </div>
    </div>
  );
}

export default Search;
