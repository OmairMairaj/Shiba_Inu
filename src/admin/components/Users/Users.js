import React from "react";
import axios from "axios";
import del from "../../../assets/delete.png";
import edit from "../../../assets/edit.png";
import delwhite from "../../../assets/deletewhite.png";
import "./Users.css";

function Users() {
  const [data, setData] = React.useState([]);
  // let [bool,setBool] = React.useState(true);

  React.useEffect(() => {
    axios.get("http://localhost:9002/admin/usersall").then((res) => {
      if (res.data.error === false) {
        setData(res.data.data);
      }
      else{
        alert("Unable to fetch data. Try again later");
      }
    })
  },[]);

  // const deleteUser = (name, password, email,role) => {
  //   const collection = {
  //     name: name,
  //     password: password,
  //     email: email,
  //     role: role,
  //   };
  //   axios
  //     .post("http://localhost:9002/api/user/removeUser", collection)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.success === true) {
  //         console.log(res.status);
  //         alert("User Deleted Successfully.");
  //       }
  //     });
  // };

  const listUsers = () => {
    if (data.length > 0) {
    return data.map((value) => (
      <div className="oneUser">
        <div className="oneUser_text">{value.name}</div>
        <div className="oneUser_text">{value.email}</div>
        <div className="oneUser_text">{`${value.is_deleted}`}</div>
        <div className="oneUser_text">{value.rewardPoints}</div>
        <img className="oneUser_icon" src={edit} alt="EDIT" />
        <img className="oneUser_icon" src={del} alt="DELETE" />
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
    <div className="allUsers">
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
      {listUsers()}
    </div>
  );
}

export default Users;
