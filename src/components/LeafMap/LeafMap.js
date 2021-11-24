import "./LeafMap.css";
import React, { useState , useRef , useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap} from "react-leaflet";
import data from "../../data/data.json";
import Slider from "../Slider/Slider";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor:   [13, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4,50],  // the same for the shadow
    popupAnchor:  [0,-40]// point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

const center = {
  lat: 40.712062139,
  lng: -74.0131062,
};

export default function LeafMap(props) {
  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false,
      })
    })
  
    return null
  }

//   var iconMarker = new L.icon({
//     iconUrl: require('../../assets/placeholder.png'),
//     iconSize:     [38, 95], // size of the icon
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });

//   const iconMe = new L.icon({
//     iconUrl: require('../../assets/user.png'),
//     shadowUrl: null,
//     iconSize:     [38, 95], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76]// point from which the popup should open relative to the iconAnchor
// });
  
  const animateRef = useRef(true)
  const [markers, setMarkers] = React.useState(data);

  // const panTo = React.useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });
  //   mapRef.current.setZoom(17);
  // }, []);

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

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });

    }, [map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          You are here. <br />
          {/* Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]} */}
        </Popup>
      </Marker>
    );
  }

  return (
    <>
      <MapContainer center={center} zoom={12} scrollWheelZoom={false}>
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
        <SetViewOnClick animateRef={animateRef} />
        <LocationMarker/>
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
      </MapContainer>
    </>
  );
}


