import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminHome from "./admin/pages/AdminHome";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminVendors from "./admin/pages/AdminVendors";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true)
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home loggedIn={loggedIn} setLoggedIn={(val)=>{setLoggedIn(val)}} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/Admin">
            <AdminHome setLoggedIn={(val)=>{setLoggedIn(val)}} />
          </Route>
          <Route exact path="/Users">
            <AdminUsers setLoggedIn={(val)=>{setLoggedIn(val)}} />
          </Route>
          <Route exact path="/Vendors">
            <AdminVendors setLoggedIn={(val)=>{setLoggedIn(val)}} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
