import React from "react";
// import axios from "axios";
// import del from "../../../assets/delete.png";
import "./Vendors.css";
import {useHistory} from "react-router-dom"
// import Login from "../../../components/Login/Login";
function Vendors() {
  const history = useHistory();
  // const [data, setData] = React.useState([]);
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

  // const deleteVendor = (name, email, role) => {
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
  //         alert("Vendor Deleted Successfully.");
  //         history.push("/Vendors")
  //       }
  //     });
  // };

  // const listVendors = () => {
  //   if (data.length > 0) {
  //     return data.map((value) => (
  //       <div className="oneVendor">
  //         <div className="oneVendor_text">{value.name}</div>
  //         <div className="oneVendor_text">{value.country}</div>
  //         <div className="oneVendor_text">{value.contactNumber}</div>
  //         <img
  //           onClick={() => {
  //             deleteVendor(
  //               value.name,
  //               value.email,
  //               "admin"
  //             );
  //             setBool(!bool);
  //           }}
  //           className="oneVendor_icon"
  //           src={del}
  //           alt="DELETE"
  //         />
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
    <>
    <div className="allVendors">
      <div className="oneVendor">
        <div className="oneVendor_text">Company Name</div>
        <div className="oneVendor_text">Country</div>
        <div className="oneVendor_text">Contact Number</div>
      </div>
      {/* {listVendors()} */}
    </div>
    </>
  );
}

export default Vendors;
