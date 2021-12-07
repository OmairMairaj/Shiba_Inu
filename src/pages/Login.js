import React from "react";
import OtherHalf from "../assets/close.png";
import "./Login.css";
export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validate() {
    if (email == "" || password == "") {
      alert("Please enter Email and Password");
    } else {
      alert("There goes an API Call");
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
    <div className="login_whole">
      <div className="login_container">
        <div className="image_otherhalf">
          <img src={OtherHalf} />
        </div>
        <div className="login_otherhalf">
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
                placeholder="John Doe"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="text"
                className="login_oneInputBox"
                placeholder="qwerty123"
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
            <button
              type="submit"
              className="login_button"
              onClick={() => {
                validate();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
