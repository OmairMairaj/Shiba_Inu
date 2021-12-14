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
import data from "../../data/data.json";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import close from "../../assets/close.png";
import pin from "../../assets/pin.png";
import icon from "../../assets/logoicon.png";
import location from "../../assets/placeholder.png";
import NoPicture from "../../assets/no-pictures.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Slider from "../Slider/Slider";
import { getGeocode } from "use-places-autocomplete";

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//Declaring
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [40, 40],
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
const center = {
  lat: 40.712062139,
  lng: -74.0131062,
};

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Main Function
export default function LeafMap({ loggedIn }) {
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //Use States
  const animateRef = useRef(true);
  const [markers, setMarkers] = React.useState(data);
  const [tempMarker, setTempMarker] = useState(center);
  const [revName, setRevName] = React.useState("");
  const [revAddress, setRevAddress] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [select, setSelect] = useState(null);
  const mapRef = React.useRef();

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
      setSelect({});
    });

    return null;
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Function : To get Pictures for a single place
  function getPictures(selection) {
    if (selection.pictures.length !== 0) {
      return selection.pictures.map((picture) => (
        <img src={`${picture}`} alt="Place Image" className="leafmapPicture" />
      ));
    } else {
      return (
        <img src={NoPicture} alt="Place Image" className="leafmapPicture" />
      );
    }
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Function : Get User Location and pan to it
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMap();
    mapRef.current = map;
    const [bbox, setBbox] = useState([]);
    useEffect(() => {
      if (!addNew && select === null) {
        map.locate().on("locationfound", function (e) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, 14);
          setBbox(e.bounds.toBBoxString().split(","));
        });
      }
    }, []);

    return position === null ? null : (
      <Marker position={position} icon={me}>
        <Popup>You are here : {bbox[0]}</Popup>
      </Marker>
    );
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Function : Set cordinates in Setter and fly to selection
  function SetSetter() {
    const map = useMap();
    mapRef.current = map;
    useEffect(() => {
      if (select !== null) {
        if (select.lat && select.lng) {
          map.flyTo({ lat: select.lat, lng: select.lng }, map.getZoom());
        }
      }
    }, [select]);

    return null;
  }

  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // Return
  return (
    <div>
      {/* Division : Strip to add place and list */}
      <div className="yellowStrip">
        <div className="user__places">
          {loggedIn === true ? (
            <>
              {" "}
              <div className="normalButton">Lorem Ipsum</div>
              <div className="normalButton">Lorem Ipsum</div>
              <div className="normalButton">Lorem Ipsum</div>
              <div className="normalButton">Lorem Ipsum</div>
              <div className="normalButton">Lorem Ipsum</div>
            </>
          ) : (<div className="normalButtonLong">Log In to view your Added Places</div>)}
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
        }}
      >
        <img src={location} style={{ width: "2.5vw" }} />
      </div>

      {/* Condition : Add Place */}
      {addNew ? (
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
              <div className="oneInput">
                Latitude :
                <input
                  className="inputField"
                  type="text"
                  value={tempMarker.lat}
                  onChange={(e) => {
                    setTempMarker({ lat: e.target.value, lng: tempMarker.lng });
                    mapRef.current.setView(
                      L.latLng(e.target.value, tempMarker.lng),
                      mapRef.current.getZoom(),
                      {
                        animate: animateRef.current || false,
                      }
                    );
                  }}
                />
              </div>

              <div className="oneInput">
                Longitude :
                <input
                  className="inputField"
                  type="text"
                  value={tempMarker.lng}
                  onChange={(e) => {
                    setTempMarker({ lat: tempMarker.lat, lng: e.target.value });

                    mapRef.current.setView(
                      L.latLng(tempMarker.lat, e.target.value),
                      mapRef.current.getZoom(),
                      {
                        animate: animateRef.current || false,
                      }
                    );
                  }}
                />
              </div>
              <div className="oneInput">
                Name :
                <input type="text" className="inputField" />
              </div>
              <div className="oneInput">
                Address :
                <input type="text" className="inputField" />
              </div>
              <div className="oneInput">
                City :
                <input type="text" className="inputField" />
              </div>
              <div className="oneInput">
                Country :
                <input type="text" className="inputField" />
              </div>
              {/* <div className="oneInput">
                Optional Details :
                <input type="text" className="inputField" />
              </div> */}
              <div>
                <button className="submit_button">Submit</button>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* Condition : Add Review */}
      {addReview ? (
        <>
          <div className="redSection">
            <img
              className="close_icon"
              src={close}
              alt="Icon"
              onClick={() => {
                setRevName("");
                setRevAddress("");
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
                  value={revName}
                  onChange={(e) => {
                    setRevName(e.target.value);
                  }}
                />
              </div>
              <div className="oneInput">
                Address :
                <input
                  type="text"
                  className="inputField"
                  value={revAddress}
                  onChange={(e) => {
                    setRevAddress(e.target.value);
                  }}
                />
              </div>
              <div className="oneInput">
                Review :
                <input type="text" className="inputField" />
              </div>
              <div className="oneInput">
                Comments :
                <input type="text" className="inputField" />
              </div>
              {/* <div className="oneInput">
                Optional Details :
                <input type="text" className="inputField" />
              </div> */}
              <div>
                <button className="submit_button">Submit</button>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* Division : Map Main */}
      <MapContainer center={center} zoom={14} scrollWheelZoom={true}>
        {/*  */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick animateRef={animateRef} />
        <LocationMarker />
        <SetSetter />
        {markers.map((marker) => {
          return (
            <Marker position={[marker.lat, marker.lng]}>
              <Popup>
                <>
                  <div className="leafmapPictureAll">{getPictures(marker)}</div>
                  <div>
                    <span>Name : {marker.name}</span>
                    <br />
                    <br />
                    <span>Address : {marker.address}</span>
                    <br />
                    <div
                      onClick={() => {
                        setRevName(marker.name);
                        setRevAddress(marker.address);
                        setAddReview(true);
                      }}
                      style={{ color: "Red", cursor: "pointer" }}
                    >
                      Write a review
                    </div>
                  </div>
                </>
              </Popup>
            </Marker>
          );
        })}

        {/* Condition : Marker to Add Place */}
        {addNew === true ? (
          <>
            <Marker
              position={[tempMarker.lat, tempMarker.lng]}
              icon={AddIcon}
            ></Marker>
          </>
        ) : null}
      </MapContainer>

      {/* Slider Main*/}
      <Slider
        data={data}
        select={select}
        setSelect={(val) => {
          setSelect(val);
        }}
      />
    </div>
  );
}
