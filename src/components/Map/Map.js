import React from "react";
import data from "../../data/data.json";
import Slider from "../Slider/Slider"
import LocImage from "../../assets/user.png";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import "./Map.css";

const libraries = ["places"];
const mapContainerStyle = {
  height: "80vh",
  width: "98vw",
};

const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 40.712062139,
  lng: -74.0131062,
};

export default function App() {
  const [markers, setMarkers] = React.useState(data);
  const [selected, setSelected] = React.useState(null);

  // const onMapClick = React.useCallback((e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.lat,
  //       lng: e.lng,
  //       name: e.name,
  //       address : e.address,
  //       pictures:e.pictures
  //     },
  //   ]);
  // }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAg8ymI6t_XxGKgeGJMTUExDPtl_3xvTo4",
    libraries,
  });

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);
  const getPictures = (selection) => {
    if (selection.pictures.length !== 0) {
      return selection.pictures.map((picture) => (
        <img src={`${picture}`} alt="Place Image" className="mapPicture" />
      ));
    } else {
      return <div>No pictures to show</div>;
    }
  };

  if (loadError) return "Error Occured. Please try again";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Locate panTo={panTo} />
      {/* <Search panTo={panTo} /> */}
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => {
          // console.log(marker.lng);
          return (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          );
        })}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <>
              <div className="mapPictureAll">{getPictures(selected)}</div>
              <div>
                <p>Name : {selected.name}</p>
                <p>Address : {selected.address}</p>
              </div>
            </>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <div>
        <Slider data={data} className='mapSlider' />
      </div>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="maplocate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src={LocImage} alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="mapsearch">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search for a location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
