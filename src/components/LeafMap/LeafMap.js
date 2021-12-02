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
import icon from "C:/Users/goget/Downloads/Projects/Shiba Inu/Shiba_Inu/src/assets/logoicon.png";
import userIcon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Slider from "../Slider/Slider";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [40, 40],
  iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 50], // the same for the shadow
  popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
});

let me = L.icon({
  iconUrl: userIcon,
  shadowUrl: iconShadow,
  iconSize: [20, 35],
  iconAnchor: [11, 40], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 50], // the same for the shadow
  popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

const center = {
  lat: 40.712062139,
  lng: -74.0131062,
};

export default function LeafMap(props) {
  const animateRef = useRef(true);
  const [markers, setMarkers] = React.useState(data);
  const [tempMarker, setTempMarker] = useState(center);
  const [addNew, setAddNew] = useState(false);
  const mapRef = React.useRef();

  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
      if (addNew) {
        setTempMarker(e.latlng);
      }
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false,
      });
    });

    return null;
  }
  const getPictures = (selection) => {
    if (selection.pictures.length !== 0) {
      return selection.pictures.map((picture) => (
        <img src={`${picture}`} alt="Place Image" className="leafmapPicture" />
      ));
    } else {
      return <div>No pictures to show</div>;
    }
  };

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const map = useMap();
    mapRef.current = map;
    useEffect(() => {
      if (!addNew) {
        map.locate().on("locationfound", function (e) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
          const radius = e.accuracy;
          const circle = L.circle(e.latlng, radius);
          circle.addTo(map);
          setBbox(e.bounds.toBBoxString().split(","));
        });
      }
    }, []);

    return position === null ? null : (
      <Marker position={position} icon={me}>
        <Popup>
          You are here. <br />
        </Popup>
      </Marker>
    );
  }

  return (
    <div>
      <div className="yellowStrip">
      <div className="normalButton" style={{fontSize:"25px",color:"red"}}>
        Lorem Ipsum
      </div>
      <div className="normalButton">
        Lorem Ipsum
      </div>
      <div className="normalButton">
        Lorem Ipsum
      </div>
      <div className="normalButton">
        Lorem Ipsum
      </div>
        <div
          className="addButton"
          onClick={() => {
            setAddNew(!addNew);
          }}
        >
          Add Place
        </div>
      </div>
      {addNew ? (
        <>
          <div className="redSection">
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
              <input type="text" className="inputField"  />
            </div>
            <div className="oneInput">
              Address :
              <input type="text" className="inputField" />
            </div>
            <div className="oneInput">
              City :
              <input type="text" className="inputField"  />
            </div>
            <div className="oneInput">
              Country :
              <input type="text" className="inputField"  />
            </div>
            <div className="oneInput">
              Optional Details :
              <input type="text" className="inputField" />
            </div>
          </div>
        </>
      ) : null}
      <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick animateRef={animateRef} />
        <LocationMarker />
        {markers.map((marker) => {
          return (
            <Marker position={[marker.lat, marker.lng]}>
              <Popup>
                <>
                  <div className="leafmapPictureAll">{getPictures(marker)}</div>
                  <div>
                    <p>Name : {marker.name}</p>
                    <p>Address : {marker.address}</p>
                  </div>
                </>
              </Popup>
            </Marker>
          );
        })}
        {addNew === true ? (
          <>
            <Marker position={[tempMarker.lat, tempMarker.lng]}></Marker>
          </>
        ) : null}
      </MapContainer>
      <Slider data={data} />
    </div>
  );
}
