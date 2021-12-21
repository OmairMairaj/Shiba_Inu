import React from "react";
import OtherHalf from "../assets/person.jpg";
import Background from "../assets/person-background.png";
import BackButton from "../assets/left.png";
import Error from "./Error";
import "./SignUp.css";
import axios from "axios";
import { useHistory,Link } from "react-router-dom";
export default function SignUp({check,setCheck}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const history = useHistory();
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
        SignupAPI();
      }
    }
  }

  function SignupAPI() {
    axios
      .post("http://localhost:9002/api/users/register", {
        name: firstName + " " + lastName,
        email: email,
        password: password,
        password2: confirmPassword,
      })
      .then((res) => {
        if (res.data.success === true) {
          axios
            .post("http://localhost:9002/api/users/login", {
              email: res.data.user.email,
              password: password,
            })
            .then((res) => {
              if (res.data.success === true) {
                sessionStorage.setItem("token", res.data.token);
                setCheck(!check)
                history.push("/");
              } else {
                alert(res.data.message);
              }
            });
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
      className="signup_whole"
      style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}
    >
      <div className="signup_container">
        <div className="image_otherhalf">
          <img src={OtherHalf} className="signup_image" />
        </div>
        <div className="signup_otherhalf">
          <div className="signup_top_buttons">
            <Link to="/" className="signup_button_container">
              <button type="submit" className="signup_button_top">
                <img src={BackButton} className="signup_back_button" />
                <span>Home</span>
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
