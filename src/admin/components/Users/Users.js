import React from "react";
import axios from "axios";
import del from "../../../assets/delete.png";
import edit from "../../../assets/edit.png";
import delwhite from "../../../assets/deletewhite.png";
import undo from "../../../assets/undo.png";
import close from "../../../assets/close.png";

import "./Users.css";

function Users() {
  const [data, setData] = React.useState(undefined);
  const [deletedData, setDeletedData] = React.useState(undefined);
  let [bool, setBool] = React.useState(true);
  let [showPanel, setShowPanel] = React.useState(false);
  let [changePoints, setChangePoints] = React.useState(0);
  let [changeEmail, setChangeEmail] = React.useState("");

  React.useEffect(() => {
    axios.get("https://afternoon-anchorage-53514.herokuapp.com/admin/usersall").then((res) => {
      if (res.data.error === false) {
        if (res.data.data === undefined) {
          setData([]);
        } else {
          setData(res.data.data);
        }
      } else {
        alert("Unable to fetch data. Try again later");
      }
    });
    axios.get("https://afternoon-anchorage-53514.herokuapp.com/admin/getdeletedusers").then((res) => {
      if (res.data.error === false) {
        if (res.data.data === undefined) {
          setDeletedData([]);
        } else {
          setDeletedData(res.data.data);
        }
      } else {
        alert("Unable to fetch deleted data. Try again later");
      }
    });
  }, [bool]);

  const deleteUser = (email) => {
    axios
      .post("https://afternoon-anchorage-53514.herokuapp.com/admin/deleteuser", { email: email })
      .then((res) => {
        //console.log(res);
        if (res.data.error === false) {
          setBool(!bool);
          alert(res.data.message);
        }
      });
  };

  const restoreUser = (email) => {
    axios
      .post("https://afternoon-anchorage-53514.herokuapp.com/admin/restoreuser", { email: email })
      .then((res) => {
        //console.log(res);
        if (res.data.error === false) {
          setBool(!bool);
          alert(res.data.message);
        }
      });
  };

  const editUser = (email) => {
    axios
      .post("https://afternoon-anchorage-53514.herokuapp.com/admin/editpoints", {
        email: email,
        rewardPoints: changePoints,
      })
      .then((res) => {
        //console.log(res);
        if (res.data.error === false) {
          setBool(!bool);
          setShowPanel(false);
          setChangePoints(0);
          setChangeEmail("");
          alert(res.data.message);
        }
      });
  };

  const listUsers = (data) => {
    if (data !== undefined) {
      if (data.length > 0) {
        return data.map((value) => (
          <div className="oneUser">
            <div className="oneUser_text">{value.name}</div>
            <div className="oneUser_text">{value.email}</div>
            <div className="oneUser_text">{`${value.is_deleted}`}</div>
            <div className="oneUser_text">{value.rewardPoints}</div>
            <img
              className="oneUser_icon"
              src={edit}
              alt="EDIT"
              onClick={() => {
                setShowPanel(true);
                setChangeEmail(value.email)
              }}
            />
            <img
              className="oneUser_icon"
              src={del}
              alt="DELETE"
              onClick={() => {
                deleteUser(value.email);
              }}
            />
          </div>
        ));
      } else {
        return (
          <>
            <div>
              <p>No Users Found</p>
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

  const listDeletedUsers = (data) => {
    if (data !== undefined) {
      if (data.length > 0) {
        return data.map((value) => (
          <div className="oneUser">
            <div className="oneUser_text">{value.name}</div>
            <div className="oneUser_text">{value.email}</div>
            <div className="oneUser_text">{`${value.is_deleted}`}</div>
            <div className="oneUser_text">{value.rewardPoints}</div>
            <img
              className="oneUser_icon"
              src={edit}
              alt="EDIT"
              onClick={() => {
                setShowPanel(true);
                setChangeEmail(value.email)
              }}
            />
            <img
              className="oneUser_icon"
              src={undo}
              alt="RESTORE"
              onClick={() => {
                restoreUser(value.email);
              }}
            />
          </div>
        ));
      } else {
        return (
          <>
            <div>
              <p>No Users Found</p>
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
      {showPanel === true ? (
        <>
          <div className="pointsPanel">
            <img
              className="points_close"
              src={close}
              alt="X"
              onClick={() => {
                setChangePoints(0);
                setShowPanel(false);
                setChangeEmail("");
              }}
            />
            <div className="points_items">
              <span className="points_head">Update Points</span>
              <div className="points_input">
                New Points :
                <input
                  type="text"
                  className="points_input_box"
                  value={changePoints}
                  onChange={(e) => {
                    setChangePoints(e.target.value);
                  }}
                />
              </div>
              <div
                className="points_button"
                onClick={() => {
                  editUser(changeEmail);
                }}
              >
                {" "}
                Submit{" "}
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className="allUsers">
        <h2>Existing Users</h2>
        <div className="oneUser" style={{ marginBottom: "5px" }}>
          <div className="oneUser_text" style={{ border: "1px solid #ffa500" }}>
            Name
          </div>
          <div className="oneUser_text" style={{ border: "1px solid #ffa500" }}>
            Email
          </div>
          <div className="oneUser_text" style={{ border: "1px solid #ffa500" }}>
            Deleted
          </div>
          <div className="oneUser_text" style={{ border: "1px solid #ffa500" }}>
            Points
          </div>
          <img className="oneUser_icon_start" src={delwhite} alt="DELETE" />
          <img className="oneUser_icon_start" src={delwhite} alt="DELETE" />
        </div>
        {listUsers(data)}
      </div>
      <div className="allUsers">
        <h2>Deleted Users</h2>
        <div className="oneUser" style={{ marginBottom: "5px" }}>
          <div className="oneUser_text" style={{ border: "1px solid #ffa500" }}>
            Name
          </div>
          <div className="oneUser_text" style={{ border: "1px solid #ffa500" }}>
            Email
          </div>
          <div className="oneUser_text" style={{ border: "1px solid #ffa500" }}>
            Deleted
          </div>
          <div className="oneUser_text" style={{ border: "1px solid #ffa500" }}>
            Points
          </div>
          <img className="oneUser_icon_start" src={delwhite} alt="DELETE" />
          <img className="oneUser_icon_start" src={delwhite} alt="DELETE" />
        </div>
        {listDeletedUsers(deletedData)}
      </div>
    </>
  );
}

export default Users;
