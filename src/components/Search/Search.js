import React from "react";
import Data from "../../data/data.json";
import "./Search.css";
import axios from 'axios'
import cross from "../../assets/close.png";
import search from "../../assets/search.png";

function Search(props) {
  let [data,setData] = React.useState([]);
  let [searchField, setSearchField] = React.useState("");

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //API Call
  const getData = async () => {
    await axios
      .get("http://localhost:9002/api/places/getapprovedplaces")
      .then((response) => {
        setData(response.data.data);
      });
  };

  React.useEffect((e) => {
    getData();
  }, []);

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
        item.place_name.toLowerCase().includes(searchField.toLowerCase())
      );
      console.log(data)
      console.log(All)
      if (All.length > 0) {
        All = All.slice(0, 5);
        return (
          <div className="results__search">
            {All.map((item) => {
              return (
                <div
                  onClick={() => {
                    console.log(item);
                  }}
                  className="oneSearch"
                >
                  <img
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
