import React from "react";
import OtherHalf from "../assets/fox.png";
import Background from "../assets/person-background.png";
import BackButton from "../assets/left.png"
import "./Login.css";
import { Link } from "react-router-dom";
export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validate() {
    if (email == "" || password == "") {
      alert("Please enter Email and Password");
    } else {
      alert(email+password);
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
    <div className="login_whole" style={{backgroundImage:`url(${Background})`, backgroundSize:"cover"}}>
      <div className="login_container">
        <div className="image_otherhalf">
          <img src={OtherHalf} className="login_image" />
        </div>
        <div className="login_otherhalf">
        <div className="login_top_buttons">
            <Link to="/" className="login_button_container">
              <button type="submit" className="login_button_top">
                <img src={BackButton} className="login_back_button"/><span>Home</span>
              </button>
            </Link>
          </div>
          <div className="login_heading">Login</div>
          <div className="login_InputSection">
            <div className="login_InputText">
              <span>Email</span>
              <span>Password</span>
            </div>
            <div className="login_InputFields">
              <input
                type="text"
                className="login_oneInputBox"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                className="login_oneInputBox"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="login_buttonBox">
            <button
              type="submit"
              className="login_button"
              onClick={() => {
                validate();
              }}
            >
              Login
            </button>
            <span> Don't have an account?</span>
            <Link to="/signup" className="login_button_container">
            <button
              type="submit"
              className="login_button"
            >
              Sign Up
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
