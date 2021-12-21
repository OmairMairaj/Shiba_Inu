import React from "react";
import axios from "axios";
import del from "../../../assets/delete.png";
import edit from "../../../assets/edit.png";
import delwhite from "../../../assets/deletewhite.png";
import "./Places.css";

function Places() {
  const [data, setData] = React.useState([]);
  // let [bool,setBool] = React.useState(true);

  React.useEffect(() => {
    axios.get("http://localhost:9002/admin/getallplaces").then((res) => {
      console.log(res);
      if (res.data.error === false) {
        // console.log(res.status);
        setData(res.data.data);
      }
      else{
        alert("Unable to fetch data. Try again later");
      }
    });
  },[]);

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
          <div className="onePlace_text">{value.lng}</div>
          <div className="onePlace_text">{value.lat}</div>
          <div className="onePlace_text">{`${value.is_approved}`}</div>
          <div className="onePlace_text">{`${value.is_deleted}`}</div>
          <img className="onePlace_icon" src={edit} alt="EDIT" />
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
        <div className="onePlace" style={{ marginBottom: "5px" }}>
          <div
            className="onePlace_text"
            style={{ border: "1px solid #ffa500" }}
          >
            Name
          </div>
          <div
            className="onePlace_text"
            style={{ border: "1px solid #ffa500" }}
          >
            lnggitude
          </div>
          <div
            className="onePlace_text"
            style={{ border: "1px solid #ffa500" }}
          >
            Latitude
          </div>
          <div
            className="onePlace_text"
            style={{ border: "1px solid #ffa500" }}
          >
            Approved
          </div>
          <div
            className="onePlace_text"
            style={{ border: "1px solid #ffa500" }}
          >
            Deleted
          </div>
          <img className="onePlace_icon_start" src={delwhite} alt="DELETE" />
          <img className="onePlace_icon_start" src={delwhite} alt="DELETE" />
        </div>
        {listPlaces()}
      </div>
    </>
  );
}

export default Places;
