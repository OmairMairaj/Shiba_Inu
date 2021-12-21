import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminHome from "./admin/pages/AdminHome";

function App() {
  const [check, setCheck] = React.useState(true);
  const [userRole, setUserRole] = React.useState(null);
  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post("http://localhost:9002/api/users/getprofile", {
          token: sessionStorage.getItem("token"),
        })
        .then((res) => {
          if (res.data.success === true) {
            setUserRole(res.data.data.role);
          }
        });
    } else {
      setUserRole(null);
    }
  }, [check]);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              check={check}
              setCheck={(val) => {
                setCheck(val);
              }}
            />
          </Route>
          <Route exact path="/login">
            <Login
              check={check}
              setCheck={(val) => {
                setCheck(val);
              }}
            />
          </Route>
          <Route exact path="/signup">
            <SignUp
              check={check}
              setCheck={(val) => {
                setCheck(val);
              }}
            />
          </Route>
          <Route exact path="/admin">
            {userRole === "admin" ? (
              <AdminHome
                check={check}
                setCheck={(val) => {
                  setCheck(val);
                }}
              />
            ) : (
              <Error />
            )}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
