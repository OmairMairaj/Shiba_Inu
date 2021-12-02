import React from "react";
import Data from "../../data/data.json";
import "./Search.css";
import cross from "../../assets/close.png";
import search from "../../assets/search.png";

function Search(props) {
  const data = Data;
  let [searchField, setSearchField] = React.useState("");

  const getIcon = () => {
    if (searchField !== "") {
      return (
        <img
          onClick={() => {
            setSearchField("");
          }}
          class="search_icon"
          src={cross}
        />
      );
    } else return <img class="search_icon" src={search} />;
  };

  const searchResults = () => {
    if (searchField != "") {
      let All = data.filter((item) =>
        item.name.toLowerCase().includes(searchField.toLowerCase())
      );
      if (All.length > 0) {
        All = All.slice(0, 9);
        return (
          <div className="results__search">
            {All.map((item) => {
              return (
                <div
                  onClick={() => {
                    // history.push(`/product/${item._id}/${item.cardNumber}`);
                    // setSearchField("");
                    console.log(item);
                  }}
                  className="oneSearch"
                >
                  <img
                    style={{ width: "22%", margin: "2px 4px 0px 0" }}
                    src={item.pictures[0]}
                  />
                  <div className="allText">
                    <div>
                      <span className="text">{item.name}</span>
                    </div>
                    {/* <div className="smalltext"><span>{item.category}</span></div> */}
                    <div className="smalltext">
                      <span>{item.address}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      } else {
        return <div className="results__search"><p className="oneSearch text">No Results Found</p></div>;
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="searchWhole">
        <input
          className="product__search"
          type="text"
          placeholder="Search for a place..."
          value={searchField}
          onChange={(e) => {
            setSearchField(e.target.value);
          }}
        />
        {getIcon()}
      </div>
      <div className="resultBox__search">{searchResults()}</div>
    </>
  );
}
export default Search;
