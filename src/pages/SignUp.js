import React from "react";
import OtherHalf from "../assets/person.jpg";
import Background from "../assets/person-background.png";
import BackButton from "../assets/left.png"
import "./SignUp.css";
import { Link } from "react-router-dom";
export default function SignUp(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  function validate() {
    if (
      email == "" ||
      password == "" ||
      confirmPassword == "" ||
      firstName == "" ||
      lastName == ""
    ) {
      alert("Please enter All Details");
    } else {
      if (confirmPassword !== password) {
        alert("Passwords do not match");
      } else {
        alert(firstName + lastName);
      }
    }
  }

  //   function LoginAPI() {
  //     var url = "http://192.168.18.8:3000/api/signin";
  //     let collection = {};
  //     (collection.email = email),
  //       (collection.password = password),
  //       fetch(url, {
  //         method: "POST",
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(collection),
  //       })
  //         .then((resp) => {
  //           return resp.json();
  //         })
  //         .then((responseJson) => {
  //           if (responseJson.success == "true") {
  //             signIn(responseJson.user.email);
  //           } else {
  //             Alert.alert(responseJson.message);
  //           }
  //         })
  //         .done();
  //   }

  return (
    <div
      className="signup_whole"
      style={{ backgroundImage: `url(${Background})`, backgroundSize:"cover" }}
    >
      <div className="signup_container">
        <div className="image_otherhalf">
          <img src={OtherHalf} className="signup_image" />
        </div>
        <div className="signup_otherhalf">
          <div className="signup_top_buttons">
            <Link to="/" className="signup_button_container">
              <button type="submit" className="signup_button_top">
                <img src={BackButton} className="signup_back_button"/><span>Home</span>
              </button>
            </Link>
          </div>
          <div className="signup_heading">Sign Up</div>
          <div className="signup_InputSection">
            <div className="signup_InputText">
              <span>First Name</span>
              <span>Last Name</span>
              <span>Email</span>
              <span>Password</span>
              <span>Confirm Password</span>
            </div>
            <div className="signup_InputFields">
              <input
                type="text"
                className="signup_oneInputBox"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type="text"
                className="signup_oneInputBox"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <input
                type="text"
                className="signup_oneInputBox"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                className="signup_oneInputBox"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type="password"
                className="signup_oneInputBox"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="signup_buttonBox">
            <button
              type="submit"
              className="signup_button"
              onClick={() => {
                validate();
              }}
            >
              Register
            </button>
            <Link to="/login" className="signup_button_container">
              <button type="submit" className="signup_button">
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
