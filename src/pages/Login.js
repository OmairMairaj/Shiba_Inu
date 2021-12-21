import React from "react";
import OtherHalf from "../assets/fox.png";
import Background from "../assets/background.jpeg";
import BackButton from "../assets/left.png";
import axios from "axios";
import Error from "./Error"
import "./Login.css";
import { useHistory,Link } from "react-router-dom";
export default function Login({check,setCheck}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  function validate() {
    if (email == "" || password == "") {
      alert("Please enter Email and Password");
    } else {
      LoginAPI();
    }
  }

  function LoginAPI() {
    axios
      .post("http://localhost:9002/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success === true) {
          sessionStorage.setItem('token',res.data.token);
          setCheck(!check)
          history.push("/")          
        } else {
          alert(res.data.message);
        }
      });
  }
  if (sessionStorage.getItem("token")) {
    return <Error />;
  }
  return (
    <div
      className="login_whole"
      style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}
    >
      <div className="login_container">
        <div className="image_otherhalf">
          <img src={OtherHalf} className="login_image" />
        </div>
        <div className="login_otherhalf">
          <div className="login_top_buttons">
            <Link to="/" className="login_button_container">
              <button type="submit" className="login_button_top">
                <img src={BackButton} className="login_back_button" />
                <span>Home</span>
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
              <button type="submit" className="login_button">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
