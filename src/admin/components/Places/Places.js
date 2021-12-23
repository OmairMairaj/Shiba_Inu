import React from "react";
import axios from "axios";
import del from "../../../assets/delete.png";
import approve from "../../../assets/approve.png";
import delwhite from "../../../assets/deletewhite.png";
import undo from "../../../assets/undo.png";
import close from "../../../assets/close.png";

import "./Places.css";

function Places() {
  const [approvedData, setApprovedData] = React.useState(undefined);
  const [pendingData, setPendingData] = React.useState(undefined);
  const [pendingDeletedData, setPendingDeletedData] = React.useState(undefined);
  const [approvedDeletedData, setApprovedDeletedData] = React.useState(undefined);
  
  let [bool, setBool] = React.useState(true);
  let [showPanel, setShowPanel] = React.useState(false);
  let [changePoints, setChangePoints] = React.useState(0);
  let [changeEmail, setChangeEmail] = React.useState("");

  React.useEffect(() => {
    axios
      .get("http://localhost:9002/admin//getpendingnotdeletedplaces")
      .then((res) => {
        //console.log(res);
        if (res.data.error === false) {
          setPendingData(res.data.data);
        } else {
          alert("Unable to fetch data. Try again later");
        }
      });

    axios
      .get("http://localhost:9002/admin/getpendingdeletedplaces")
      .then((res) => {
        //console.log(res);
        if (res.data.error === false) {
          setPendingDeletedData(res.data.data);
        } else {
          alert("Unable to fetch data. Try again later");
        }
      });

    axios
      .get("http://localhost:9002/admin/getapprovednotdeletedplaces")
      .then((res) => {
        //console.log(res);
        if (res.data.error === false) {
          setApprovedData(res.data.data);
        } else {
          alert("Unable to fetch data. Try again later");
        }
      });

    axios
      .get("http://localhost:9002/admin/getapproveddeletedplaces")
      .then((res) => {
        //console.log(res);
        if (res.data.error === false) {
          setApprovedDeletedData(res.data.data);
        } else {
          alert("Unable to fetch data. Try again later");
        }
      });
  }, [bool]);

  const deletePlace = (_id) => {
    axios
      .post("http://localhost:9002/admin/deleteplace", { _id: _id })
      .then((res) => {
        if (res.data.error === false) {
          setBool(!bool);
          alert(res.data.message);
        }
      });
  };

  const restorePlace = (_id) => {
    axios
      .post("http://localhost:9002/admin/restoreplace", { _id: _id })
      .then((res) => {
        if (res.data.error === false) {
          setBool(!bool);
          alert(res.data.message);
        }
      });
  };

  const approvePlace = (_id) => {
    axios
      .post("http://localhost:9002/admin/approveplace", { _id: _id })
      .then((res) => {
        if (res.data.error === false) {
          setBool(!bool);
          alert(res.data.message);
        }
      });
  };

  // const editUser = (email) => {
  //   axios
  //     .post("http://localhost:9002/admin/editpoints", {
  //       email: email,
  //       rewardPoints: changePoints,
  //     })
  //     .then((res) => {
  //       //console.log(res);
  //       if (res.data.error === false) {
  //         setBool(!bool);
  //         setShowPanel(false);
  //         setChangePoints(0);
  //         setChangeEmail("");
  //         alert(res.data.message);
  //       }
  //     });
  // };

  const listPlacesWithDelete = (data) => {
    if (data !== undefined) {
      if (data.length > 0) {
        return data.map((value) => (
          <div className="onePlace">
            <div className="onePlace_text">{value.place_name}</div>
            <div className="onePlace_text">{value.lng}</div>
            <div className="onePlace_text">{value.lat}</div>
            <div className="onePlace_text">{`${value.is_approved}`}</div>
            <div className="onePlace_text">{`${value.is_deleted}`}</div>
            <img
              className="onePlace_icon"
              src={del}
              alt="DELETE"
              onClick={() => {
                deletePlace(value._id);
              }}
            />
          </div>
        ));
      } else {
        return (
          <>
            <div>
              <p>No Places Found</p>
            </div>
          </>
        );
      }
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

  const listPlacesWithDeleteAndApprove = (data) => {
    if (data !== undefined) {
      if (data.length > 0) {
        return data.map((value) => (
          <div className="onePlace">
            <div className="onePlace_text">{value.place_name}</div>
            <div className="onePlace_text">{value.lng}</div>
            <div className="onePlace_text">{value.lat}</div>
            <div className="onePlace_text">{`${value.is_approved}`}</div>
            <div className="onePlace_text">{`${value.is_deleted}`}</div>
            <img
              className="onePlace_icon"
              src={del}
              alt="DELETE"
              onClick={() => {
                deletePlace(value._id);
              }}
            />
            <img
              className="onePlace_icon"
              src={approve}
              alt="APPROVE"
              onClick={() => {
                approvePlace(value._id);
              }}
            />
          </div>
        ));
      } else {
        return (
          <>
            <div>
              <p>No Places Found</p>
            </div>
          </>
        );
      }
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

  const listPlacesWithRestore = (data) => {
    if (data !== undefined) {
      if (data.length > 0) {
        return data.map((value) => (
          <div className="onePlace">
            <div className="onePlace_text">{value.place_name}</div>
            <div className="onePlace_text">{value.lng}</div>
            <div className="onePlace_text">{value.lat}</div>
            <div className="onePlace_text">{`${value.is_approved}`}</div>
            <div className="onePlace_text">{`${value.is_deleted}`}</div>
            <img
              className="onePlace_icon"
              src={undo}
              alt="RESTORE"
              onClick={() => {
                restorePlace(value._id);
              }}
            />
          </div>
        ));
      } else {
        return (
          <>
            <div>
              <p>No Places Found</p>
            </div>
          </>
        );
      }
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

  const listPlacesWithRestoreAndApprove = (data) => {
    if (data !== undefined) {
      if (data.length > 0) {
        return data.map((value) => (
          <div className="onePlace">
            <div className="onePlace_text">{value.place_name}</div>
            <div className="onePlace_text">{value.lng}</div>
            <div className="onePlace_text">{value.lat}</div>
            <div className="onePlace_text">{`${value.is_approved}`}</div>
            <div className="onePlace_text">{`${value.is_deleted}`}</div>
            <img
              className="onePlace_icon"
              src={undo}
              alt="RESTORE"
              onClick={() => {
                restorePlace(value._id);
              }}
            />
            <img
              className="onePlace_icon"
              src={approve}
              alt="APPROVE"
              onClick={() => {
                approvePlace(value._id);
              }}
            />
          </div>
        ));
      } else {
        return (
          <>
            <div>
              <p>No Places Found</p>
            </div>
          </>
        );
      }
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
        <h2>Approved Places</h2>
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
            Longitude
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
        {listPlacesWithDelete(approvedData)}
      </div>
      <div className="allPlaces">
        <h2>Pending Places</h2>
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
            Longitude
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
        {listPlacesWithDeleteAndApprove(pendingData)}
      </div>
      <div className="allPlaces">
        <h2>Approved Deleted Places</h2>
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
            Longitude
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
        {listPlacesWithRestore(approvedDeletedData)}
      </div>
      <div className="allPlaces">
        <h2>Pending Deleted Places</h2>
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
            Longitude
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
        {listPlacesWithRestoreAndApprove(pendingDeletedData)}
      </div>
    </>
  );
}

export default Places;
