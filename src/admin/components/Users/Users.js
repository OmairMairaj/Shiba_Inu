import React from "react";
// import axios from "axios";
// import del from "../../../assets/delete.png";
import "./Users.css";

function Users() {
  // const [data, setData] = React.useState([]);
  // let [bool,setBool] = React.useState(true);
  
  // React.useEffect(() => {
  //   const text="admin"
  //   const collection = {
  //     role:text
  //   }
  //   axios.post("http://localhost:9002/api/user/getAllUsers",collection).then((res) => {
  //     console.log(res);
  //     if (res.data.success === true) {
  //       console.log(res.status);
  //       setData(res.data.data);
  //     }
  //   })
  // }, [bool]);
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
  // const listUsers = () => {
  //   if (data.length > 0) {
  //     return data.map((value) => (
  //       <div className="oneUser">
  //         <img src={value.profilePicture} className="oneUser_picture" />
  //         <div className="oneUser_text">{value.name}</div>
  //         <div className="oneUser_text">{value.email}</div>
  //         <div className="oneUser_text">{value.contactNumber}</div>
  //           <img
  //             onClick={() => {
  //               deleteUser(value.name, value.password, value.email, "admin")
  //               setBool(!bool)
  //             }}
  //             className="oneUser_icon"
  //             src={del}
  //             alt="DELETE"
  //           />
  //       </div>
  //     ));
  //   } else {
  //     return (
  //       <>
  //         <div>
  //           <p>Loading...</p>
  //         </div>
  //       </>
  //     );
  //   }
  // };
  return (
    <div className="allUsers">
      <div className="oneUser">
        <div className="oneUser_picture"> Profile Picture </div>
        <div className="oneUser_text">Full Name</div>
        <div className="oneUser_text">Email</div>
        <div className="oneUser_text">Contact Number</div>
      </div>
      {/* {listUsers()} */}
    </div>
  );
}

export default Users;
