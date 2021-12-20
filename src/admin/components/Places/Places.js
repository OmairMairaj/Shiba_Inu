import React from "react";
import axios from "axios";
import del from "../../../assets/delete.png";
import delwhite from "../../../assets/deletewhite.png";
import "./Places.css";
import { useHistory } from "react-router-dom";

function Places() {
  const history = useHistory();
  const [data, setData] = React.useState([
    {
      place_name: "Five Star",
      lon: 25.6542151525,
      lat: 25.6542151525,
      isApproved: true,
      isDeleted: false,
    },
  ]);
  // let [bool,setBool] = React.useState(true);
  // React.useEffect(() => {
  //   const role = {"role":"admin"};
  //   axios.get("http://localhost:9002/api/com/getAllCompanies").then((res) => {
  //     console.log(res);
  //     if (res.data.success === true) {
  //       console.log(res.status);
  //       setData(res.data.data);
  //     }
  //   });
  // }, [bool]);

  // const deletePlace = (name, email, role) => {
  //   const collection = {
  //     name: name,
  //     email: email,
  //     role: role,
  //   };
  //   console.log(collection)
  //   axios
  //     .post("http://localhost:9002/api/com/removeCompany", collection)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.success === true) {
  //         console.log(res.status);
  //         alert("Place Deleted Successfully.");
  //         history.push("/Places")
  //       }
  //     });
  // };

  const listPlaces = () => {
    if (data.length > 0) {
      return data.map((value) => (
        <div className="onePlace">
          <div className="onePlace_text">{value.place_name}</div>
          <div className="onePlace_text">{value.lon}</div>
          <div className="onePlace_text">{value.lat}</div>
          <div className="onePlace_text">{`${value.isApproved}`}</div>
          <div className="onePlace_text">{`${value.isDeleted}`}</div>
          <img className="onePlace_icon" src={del} alt="DELETE" />
        </div>
      ));
    } else {
      return (
        <>
          <div>
            <p>Loading...</p>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <div className="allPlaces">
        <div className="onePlace">
          <div className="onePlace_text">Name</div>
          <div className="onePlace_text">Longitude</div>
          <div className="onePlace_text">Latitude</div>
          <div className="onePlace_text">Approved</div>
          <div className="onePlace_text">Deleted</div>
          <img className="onePlace_icon_start" src={delwhite} alt="DELETE" />
        </div>
        {listPlaces()}
      </div>
    </>
  );
}

export default Places;
