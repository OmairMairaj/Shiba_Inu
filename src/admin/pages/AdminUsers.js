import React from "react";
import "./AdminHome.css";
import Users from "../components/Users/Users";
import {Link } from "react-router-dom";
function AdminUsers({setLoggedIn }) {
  return (
    <>
      <div className="adminhome_container">
        <div className="sidebar">
          <h2>Admin Dashboard</h2>
          <Link to="/Admin">
            <div className="sidebar_object">
              <span>Home</span>
            </div>
          </Link>
          <Link to="/Vendors">
            <div className="sidebar_object">
              <span>Vendors</span>
            </div>
          </Link>
          <Link to="/Users">
            <div className="sidebar_object">
              <span>Users</span>
            </div>
          </Link>
          <Link to="/">
            <div
                     onClick={() => {
                        setLoggedIn(false);
                        sessionStorage.clear();
                      }}
              className="sidebar_object"
            >
              <span>Logout</span>
            </div>
          </Link>
        </div>
        <div className="admin_content">
          <h1>Users</h1>
          <Users />
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
