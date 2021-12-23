// import React, { useState } from "react";
// import "./NewVendor.css";
// import axios from "axios";
// import {useHistory} from "react-router-dom"

// function Vendor({setCheck}){
//   const history = useHistory();
//   const [user, setUser] = React.useState({
//     name: "",
//     email: "",
//     password: "",
//     country: "",
//     contactNumber: "",
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: value,
//     });
//   };

//   const register = () => {
//     const { name, email, password, country } = user;
//     if (name && email && password && country) {
//       if (email.includes(".com")) {
//         axios
//           .post("http://localhost:9002/api/com/newCompany", user)
//           .then((res) => {
//               //console.log(res);
//             if (res.data.success === true) {
//               history.push("/admin");
//               alert(res.data.message);
//             }
//           });
//       } else {
//         alert("Enter Valid Email");
//       }
//     } else {
//       alert("Please enter all details");
//     }
//   };

//   return (
//     <div className="new_vendor_body">
//       <div className="new_vendor_container">
//         <div className="new_vendor_containerBox">
//           <div style={{ marginTop: "3rem" }} className="row">
//             <div className="col s8 offset-s2">
//               <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//                 <h4>
//                   <b>New Company</b>
//                 </h4>
//               </div>
//               <div className="input-field col s12">
//                 <input
//                   onChange={handleChange}
//                   value={user.name}
//                   type="text"
//                   name="name"
//                 />
//                 <label htmlFor="name">Full Name</label>
//               </div>

//               <div className="input-field col s12">
//                 <input
//                   onChange={handleChange}
//                   value={user.email}
//                   type="text"
//                   name="email"
//                 />
//                 <label htmlFor="email">Email</label>
//               </div>
//               <div className="input-field col s12">
//                 <input
//                   onChange={handleChange}
//                   value={user.password}
//                   type="password"
//                   name="password"
//                 />
//                 <label htmlFor="password">Password</label>
//               </div>
//               <div className="input-field col s12">
//                 <input
//                   onChange={handleChange}
//                   value={user.country}
//                   type="text"
//                   name="country"
//                 />
//                 <label htmlFor="repassword">Country</label>
//               </div>
//               <div className="input-field col s12">
//                 <input
//                   onChange={handleChange}
//                   value={user.contactNumber}
//                   type="text"
//                   name="contactNumber"
//                 />
//                 <label htmlFor="contactNumber">Contact Number</label>
//               </div>
//               <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//                 <button
//                   style={{
//                     width: "150px",
//                     borderRadius: "3px",
//                     letterSpacing: "1.5px",
//                     marginTop: "1rem",
//                   }}
//                   onClick={register}
//                   className="btn btn-large waves-effect waves-light hoverable blue accent-3"
//                 >
//                   Create Vendor
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Vendor;
