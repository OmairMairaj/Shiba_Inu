import React from "react";
import "./AdminHome.css";
import { Link } from "react-router-dom";
import Users from "../components/Users/Users";
import Places from "../components/Places/Places";
function AdminHome({ check , setCheck }) {
  const [page, setPage] = React.useState("Home");
  return (
    <>
      <div className="adminhome_container">
        <div className="sidebar">
          <h2>Hello, Admin</h2>
          <div
            onClick={() => {
              setPage("Home")
            }}
            className="sidebar_object"
          >
            <span className="sidebar_text">Home</span>
          </div>
          <div
            onClick={() => {
              setPage("Places")
            }}
            className="sidebar_object"
          >
            <span className="sidebar_text">Places</span>
          </div>
          <div
            onClick={() => {
              setPage("Users")
            }}
            className="sidebar_object"
          >
            <span className="sidebar_text">Users</span>
          </div>
          <Link to="/">
            <div
              onClick={() => {
                sessionStorage.clear();
                setCheck(!check);
              }}
              className="sidebar_object"
            >
              <span className="sidebar_text">Logout</span>
            </div>
          </Link>
        </div>
        <div className="admin_content">
          {page === "Home" ? (
            <>
              <h1>Dashboard</h1>
            </>
          ) : null}
          {page === "Users" ? (
            <>
              <h1>Users</h1>
              <Users />
            </>
          ) : null}
          {page === "Places" ? (
            <>
              <h1>Places</h1>
              <Places />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default AdminHome;
