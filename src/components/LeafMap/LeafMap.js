//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//Importing
import "./LeafMap.css";
import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";
import L, { map } from "leaflet";
import "leaflet/dist/leaflet.css";
import close from "../../assets/close.png";
import pin from "../../assets/pin.png";
import icon from "../../assets/locationicon.png";
import location from "../../assets/placeholder.png";
import NoPicture from "../../assets/no-pictures.png";
import star from "../../assets/star.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Slider from "../Slider/Slider";
import axios from "axios";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import AddPlaceDropdown from "../AddPlaceDropdown/AddPlaceDropdown";

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//Declaring
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [40, 50],
  iconAnchor: [20, 40],
  shadowAnchor: [4, 50],
  popupAnchor: [0, -40],
});
let AddIcon = L.icon({
  iconUrl: pin,
  iconSize: [40, 40],
});
let me = L.icon({
  iconUrl: location,
  shadowUrl: iconShadow,
  iconSize: [33, 35],
  iconAnchor: [11, 40],
  shadowAnchor: [4, 50],
  popupAnchor: [0, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Main Function
export default function LeafMap({ data, upperSearch, setUpperSearch }) {
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //Use States
  const animateRef = useRef(true);
  const [markers, setMarkers] = React.useState();
  const [reviews, setReviews] = React.useState(null);
  const [reviewRating, setReviewRating] = React.useState("#");
  const [myLoc, setMyLoc] = React.useState({
    lat: 40.712062139,
    lng: -74.0131062,
  });
  const [nearbyMarkers, setNearbyMarkers] = React.useState();
  const [tempMarker, setTempMarker] = useState({
    lat: 40.712062139,
    lng: -74.0131062,
  });
  const [revPlace, setRevPlace] = React.useState({});
  const [revNum, setRevNum] = useState(1);
  const [revText, setRevText] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [getLocationNow, setGetLocationNow] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [select, setSelect] = useState(null);
  const mapRef = React.useRef();
  const [start, setStart] = useState(true);
  const [addPlaceName, setAddPlaceName] = React.useState("");
  const [addPlaceCategory, setAddPlaceCategory] = React.useState("All");
  const [addPlaceDesc, setAddPlaceDesc] = React.useState("");
  const [addPlaceWebsite, setAddPlaceWebsite] = React.useState("");
  const [userPlaces, setUserPlaces] = React.useState([]);

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //API Call

  function addPlaceAPI() {
    // if(addPlaceWebsite===""){}
    if (data !== null) {
      axios
        .post("http://localhost:7000/api/places/addplace", {
          place_name: addPlaceName,
          lng: tempMarker.lng,
          lat: tempMarker.lat,
          category: addPlaceCategory,
          images: "https://img.icons8.com/ios/452/no-image.png",
          desc: addPlaceDesc,
          website: addPlaceWebsite,
          createdByEmail: data.email,
        })
        .then((response) => {
          alert(response.data.message);
          if (response.data.error === false) {
            setAddPlaceName("");
            setAddPlaceDesc("");
            setAddPlaceWebsite("");
            setAddPlaceCategory("");
            setAddNew(false);
          }
        });
    } else {
      alert("Please Login to add a place");
    }
  }

  function addReviewAPI() {
    if (data !== null) {
      axios
        .post(
          "https://afternoon-anchorage-53514.herokuapp.com/api/reviews/addreview",
          {
            place: revPlace,
            rating: revNum,
            reviewText: revText,
            authorEmail: data.email,
          }
        )
        .then((response) => {
          alert(response.data.message);
          if (response.data.error === false) {
            setRevNum(1);
            setRevText("");
            setAddReview(false);
          }
        });
    } else {
      alert("Please Login to add a review");
    }
  }

  function getReviews(id) {
    axios
      .post("http://localhost:7000/api/reviews/getplacereviews", {
        place: id,
      })
      .then((response) => {
        if (response.data.error === false) {
          setReviews(response.data.data.reviews);
          setReviewRating(response.data.data.rating);
        } else {
          alert(response.data.message);
        }
      });
  }

  const getPlacesByUser = async () => {
    axios
      .post("http://localhost:7000/api/places/getapprovedplacesforoneuser", {
        createdByEmail: data.email,
      })
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.error === false) {
          setUserPlaces(response.data.data);
        } else {
          alert(response.data.message);
        }
      });
  };

  const getData = async () => {
    await axios
      .get(
        "https://afternoon-anchorage-53514.herokuapp.com/api/places/getapprovedplaces"
      )
      .then((response) => {
        setMarkers(response.data.data);
      });
  };
  const getNearbyData = async (Loc) => {
    // console.log(Loc.lat)
    await axios
      .post(
        "https://afternoon-anchorage-53514.herokuapp.com/api/places/getnearby",
        {
          lat: Loc.lat,
          lng: Loc.lng,
        }
      )
      .then((response) => {
        //console.log(response)
        setNearbyMarkers(response.data.data);
      });
  };

  React.useEffect((e) => {
    getData();
  }, []);

  React.useEffect(
    (e) => {
      if (sessionStorage.getItem("token") !== null) {
        getPlacesByUser();
      }
    },
    [data]
  );

  React.useEffect((e) => {
    if (upperSearch !== null) {
      setSelect(upperSearch);
    }
  });
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Function : Map Animation
  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
      if (addNew) {
        setTempMarker(e.latlng);
      } else {
        map.setView(e.latlng, map.getZoom(), {
          animate: animateRef.current || false,
        });
      }
    });

    return null;
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Function : To get Pictures for a single place
  function getPictures(selection) {
    if (selection.images !== "") {
      return (
        <img
          src={`${selection.images}`}
          alt="Place Image"
          className="leafmapPicture"
        />
      );
    } else {
      return (
        <img src={NoPicture} alt="Place Image" className="leafmapPicture" />
      );
    }
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Function : Get User Location and pan to it
  function LocationMarker() {
    // const [position, setPosition] = useState(null);
    // const map = useMap();
    // mapRef.current = map;
    // const [bbox, setBbox] = useState([]);
    // useEffect(() => {
    //   if (!addNew && select === null) {
    //     map.locate().on("locationfound", function (e) {
    //       setPosition(e.latlng);
    //       map.flyTo(e.latlng, 14);
    //       setBbox(e.bounds.toBBoxString().split(","));
    //     });
    //   }
    // }, []);
    // return (position === null) ? null : (
    //   <Marker position={position} icon={me}>
    //     <Popup>You are here : {bbox[0]}</Popup>
    //   </Marker>
    // );
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Function : Search and pan

  function LeafletControlGeocoder() {
    const map = useMap();
    useEffect(() => {
      var geocoder = L.Control.Geocoder.nominatim();
      if (typeof URLSearchParams !== "undefined" && location.search) {
        var params = new URLSearchParams(location.search);
        var geocoderString = params.get("geocoder");
        if (geocoderString && L.Control.Geocoder[geocoderString]) {
          geocoder = L.Control.Geocoder[geocoderString]();
        } else if (geocoderString) {
          console.warn("Unsupported geocoder", geocoderString);
        }
      }
      if (start) {
        L.Control.geocoder({
          query: "",
          placeholder: "Search here...",
          defaultMarkGeocode: false,
          geocoder,
        })
          .on("markgeocode", function (e) {
            setSelect({});
            var latlng = e.geocode.center;
            L.circle(latlng, { radius: 2000, opacity: 0.1 }).addTo(map);
            setTempMarker({
              lat: e.geocode.center.lat,
              lng: e.geocode.center.lng,
            });
            map.flyTo(latlng, 14);
          })
          .addTo(map);
        setStart(false);
      }
    }, []);
    return null;
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Function : Set cordinates in Setter and fly to selection
  function SetSetter() {
    const map = useMap();
    mapRef.current = map;
    useEffect(() => {
      if (select !== null) {
        if (select.lat && select.lng) {
          map.flyTo({ lat: select.lat, lng: select.lng }, 14);
        }
      }
    }, [select]);

    return null;
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Function : Check cordinates and set marker to add place

  const floatRegExp = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");

  function checkCordinatesLng(e) {
    const amount = e.target.value;
    if (!amount || floatRegExp.test(amount)) {
      setTempMarker({ lat: tempMarker.lat, lng: amount });
      mapRef.current.setView(
        L.latLng(tempMarker.lat, amount),
        mapRef.current.getZoom(),
        {
          animate: animateRef.current || false,
        }
      );
    }
  }
  function checkCordinatesLat(e) {
    const amount = e.target.value;
    if (!amount || floatRegExp.test(amount)) {
      setTempMarker({ lat: amount, lng: tempMarker.lng });
      mapRef.current.setView(
        L.latLng(amount, tempMarker.lng),
        mapRef.current.getZoom(),
        {
          animate: animateRef.current || false,
        }
      );
    }
  }

  function userLoc() {
    if (mapRef.current) {
      mapRef.current.locate().on("locationfound", function (e) {
        setMyLoc(e.latlng);
        setGetLocationNow(true);
      });
    }
  }

  React.useEffect(
    (e) => {
      if (select === null && getLocationNow) {
        mapRef.current.flyTo(myLoc, 14);
      }
    },
    [select, getLocationNow]
  );

  React.useEffect(
    (e) => {
      userLoc();
    },
    [mapRef.current]
  );
  React.useEffect(
    (e) => {
      if (getLocationNow) {
        getNearbyData(myLoc);
      }
    },
    [getLocationNow]
  );

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Return
  return (
    <div>
      {/* Division : Strip to add place and list */}
      <div className="yellowStrip">
        <div
          className={
            userPlaces.length === 0 && sessionStorage.getItem("token") !== null
              ? "user__places"
              : "user__places__with__places"
          }
        >
          {sessionStorage.getItem("token") !== null ? (
            userPlaces.length === 0 ? (
              <div className="normalButtonLong">
                You have not added any place yet. Add your first one today!
              </div>
            ) : (
              <>
                <div className="normalButtonText">Your Places : </div>
                <div className="all_user_places">
                  {userPlaces.map((item) => {
                  return (
                    <>
                      <div
                        className="normalButton"
                        onClick={() => {
                          setUpperSearch(item);
                        }}
                      >
                        {item.place_name}
                      </div>
                    </>
                  );
                })}
                </div>
              </>
            )
          ) : (
            <div className="normalButtonLong">
              Log In to view your Added Places
            </div>
          )}
        </div>
        <div
          className="addButton"
          onClick={() => {
            setAddNew(!addNew);
          }}
        >
          {addNew ? <span>Back to Map</span> : <span>Add Place</span>}
        </div>
      </div>

      {/* location button */}
      <div
        className="locButton"
        onClick={() => {
          setSelect(null);
          setUpperSearch(null);
          mapRef.current.flyTo(myLoc, 14);
        }}
      >
        <img src={location} style={{ width: "2.5vw" }} />
      </div>

      {/* Condition : Add Place */}
      {addNew ? (
        <>
          {sessionStorage.getItem("token") !== null ? (
            <>
              <div className="redSection">
                <img
                  className="close_icon"
                  src={close}
                  alt="Icon"
                  onClick={() => {
                    setAddNew(false);
                  }}
                />
                <div style={{ paddingTop: "15px" }}>
                  <span className="write_a_review">Add a Place</span>
                  <span
                    className="write_a_review"
                    style={{ fontSize: "12px", color: "#ffa500" }}
                  >
                    * fields are not to be left blank
                  </span>
                  <div className="oneInput">
                    * Latitude :
                    <input
                      className="inputField"
                      type="text"
                      value={tempMarker.lat}
                      onChange={(e) => checkCordinatesLat(e)}
                    />
                  </div>

                  <div className="oneInput">
                    * Longitude :
                    <input
                      className="inputField"
                      type="text"
                      value={tempMarker.lng}
                      onChange={(e) => checkCordinatesLng(e)}
                    />
                    {/* <input
                  className="inputField"
                  type="text"
                  value={tempMarker.lng}
                  onChange={(e) => {
                    
                  }}
                /> */}
                  </div>
                  <div className="oneInput">
                    * Place Name :
                    <input
                      type="text"
                      className="inputField"
                      value={addPlaceName}
                      onChange={(e) => {
                        setAddPlaceName(e.target.value);
                      }}
                    />
                  </div>
                  {/* <div className="oneInput">
              </div> */}
                  <div className="oneInput">
                    * Category :
                    <AddPlaceDropdown
                      cat={addPlaceCategory}
                      setCat={(val) => {
                        setAddPlaceCategory(val);
                        // console.log(addPlaceCategory);
                      }}
                    />
                    {/* <input
                  type="text"
                  className="inputField"
                  value={addPlaceCategory}
                  onChange={(e) => {
                    setAddPlaceCategory(e.target.value);
                  }}
                /> */}
                  </div>
                  <div className="oneInput">
                    Description :
                    <input
                      type="text"
                      className="inputField"
                      value={addPlaceDesc}
                      onChange={(e) => {
                        setAddPlaceDesc(e.target.value);
                      }}
                    />
                  </div>
                  <div className="oneInput">
                    Website :
                    <input
                      type="text"
                      className="inputField"
                      value={addPlaceWebsite}
                      onChange={(e) => {
                        setAddPlaceWebsite(e.target.value);
                      }}
                    />
                  </div>

                  <div className="submit_button_holder">
                    <button
                      className="submit_button"
                      onClick={() => {
                        addPlaceAPI();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="redSection">
                <img
                  className="close_icon"
                  src={close}
                  alt="Icon"
                  onClick={() => {
                    setAddNew(false);
                  }}
                />
                <div style={{ paddingTop: "15px" }}>
                  <span className="write_a_review">
                    Please Login to add a place
                  </span>
                </div>
              </div>
            </>
          )}
        </>
      ) : null}

      {/* Condition : Add Review */}
      {addReview ? (
        sessionStorage.getItem("token") !== null ? (
          <>
            <div className="redSection">
              <img
                className="close_icon"
                src={close}
                alt="Icon"
                onClick={() => {
                  setRevPlace({});
                  setRevNum(1);
                  setRevText("");
                  setAddReview(false);
                }}
              />
              <div style={{ paddingTop: "15px" }}>
                <span className="write_a_review">Write a Review</span>
                <div className="oneInput">
                  Name :
                  <input
                    type="text"
                    className="inputField"
                    value={revPlace.place_name}
                  />
                </div>
                <div className="oneInput">
                  Latitude :
                  <input
                    type="text"
                    className="inputField"
                    value={revPlace.lat}
                  />
                </div>{" "}
                <div className="oneInput">
                  Longitude :
                  <input
                    type="text"
                    className="inputField"
                    value={revPlace.lng}
                  />
                </div>
                <div className="oneInput">
                  Review Score:
                  <input
                    type="number"
                    className="inputField"
                    value={revNum}
                    onChange={(e) => {
                      if (e.target.value >= 1 && e.target.value <= 5)
                        setRevNum(e.target.value);
                    }}
                  />
                </div>
                <div className="oneInput">
                  Comments :
                  <textarea
                    className="inputFieldBig"
                    value={revText}
                    onChange={(e) => {
                      setRevText(e.target.value);
                    }}
                  />
                </div>
                <div className="submit_button_holder">
                  <button
                    className="submit_button"
                    onClick={() => addReviewAPI()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="redSection">
              <img
                className="close_icon"
                src={close}
                alt="Icon"
                onClick={() => {
                  setRevPlace({});
                  setRevNum(1);
                  setRevText("");
                  setAddReview(false);
                }}
              />
              <div style={{ paddingTop: "15px" }}>
                <span className="write_a_review">
                  Please Login to write a review
                </span>
              </div>
            </div>
          </>
        )
      ) : null}

      {/* Condition : Show Reviews */}
      {showReview ? (
        <>
          <div className="Right__RedSection">
            <img
              className="right_close_icon"
              src={close}
              alt="Icon"
              onClick={() => {
                setRevPlace({});
                setShowReview(false);
                setReviews(null);
              }}
            />
            <div>
              <div className="write_a_review">Reviews</div>
              {reviews ? (
                reviews.length === 0 ? (
                  <>
                    <div className="write_a_review">
                      {" "}
                      No Reviews Available for this place
                    </div>
                  </>
                ) : (
                  <>
                    <div className="review_box">
                      <div className="review_box_desc">
                        <div className="review_box_oneLine">
                          Place : {revPlace.place_name}
                        </div>
                        <div className="review_box_oneDesc">
                          Latitude : {revPlace.lat}
                        </div>
                        <div className="review_box_oneDesc">
                          Longitude : {revPlace.lng}
                        </div>
                      </div>
                      <div className="review_box_rating">
                        <span >Average Rating : </span>
                        <img className="review_box_onePicture" src={star} />
                        <span >
                          {reviewRating}
                        </span>
                      </div>
                      <div className="review_box_revs">
                        {reviews.map((item) => {
                          return (
                            <div className="review_box_revs_entire">
                              <div className="review_box_revs_rat">
                                <img
                                  src={star}
                                  className="review_box_onePicture"
                                />
                                <span>{item.rating}</span>
                              </div>
                              <div className="review_box_revs_text">
                                {item.reviewText}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className="write_a_review"> Fetching Reviews...</div>
                </>
              )}
            </div>
          </div>
        </>
      ) : null}

      {/* Division : Map Main */}
      <MapContainer
        center={{ lat: 40.712062139, lng: -74.0131062 }}
        zoom={14}
        scrollWheelZoom={true}
      >
        {/*  */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick animateRef={animateRef} />
        {/* <LocationMarker /> */}
        <SetSetter />
        <LeafletControlGeocoder />
        {markers ? (
          markers.map((marker) => {
            return (
              <Marker position={[marker.lat, marker.lng]}>
                <Popup>
                  <>
                    <div className="leafmapPictureAll">
                      {getPictures(marker)}
                    </div>
                    <div>
                      <span>Name : {marker.place_name}</span>
                      <br />
                      <span>Description : {marker.desc}</span>
                      <br />
                      <div
                        onClick={() => {
                          setRevPlace(marker);
                          setShowReview(true);
                          setAddReview(false);
                          getReviews(marker._id);
                        }}
                        style={{ color: "Green", cursor: "pointer" }}
                      >
                        See Reviews
                      </div>
                      <div
                        onClick={() => {
                          setRevPlace(marker);
                          setAddReview(true);
                          setShowReview(false)
                        }}
                        style={{ color: "Red", cursor: "pointer" }}
                      >
                        Write a Review
                      </div>
                    </div>
                  </>
                </Popup>
              </Marker>
            );
          })
        ) : (
          <div
            style={{
              position: "absolute",
              zIndex: "1000",
              backgroundColor: "blue",
            }}
          >
            Fetching Data...
          </div>
        )}

        {/* Condition : Marker to Add Place */}
        {addNew === true ? (
          <>
            <Marker
              position={[tempMarker.lat, tempMarker.lng]}
              icon={AddIcon}
            ></Marker>
          </>
        ) : null}
        {myLoc ? (
          <>
            <Marker position={myLoc} icon={me}></Marker>
          </>
        ) : null}
      </MapContainer>

      {/* Slider Main*/}
      {nearbyMarkers ? (
        <Slider
          data={nearbyMarkers}
          select={select}
          setSelect={(val) => {
            setSelect(val);
            setUpperSearch(val);
          }}
        />
      ) : null}
    </div>
  );
}
