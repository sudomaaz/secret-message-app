import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#msgToggler"
        aria-controls="msgToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="msgToggler">
        <ul className="navbar-nav mr-auto mt-2 mt-md-0">
          <Link to="/">
            <li
              className={props.home === "1" ? "nav-item active" : "nav-item"}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-link">
                <h5>Home</h5>
              </span>
            </li>
          </Link>
          <Link to="/create">
            <li
              className={props.home === "2" ? "nav-item active" : "nav-item"}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-link">
                <h5>Create Message</h5>
              </span>
            </li>
          </Link>
          <Link to="/delete">
            <li
              className={props.home === "3" ? "nav-item active" : "nav-item"}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-link">
                <h5>Delete Message</h5>
              </span>
            </li>
          </Link>
        </ul>
      </div>
      <h1 className="navbar-brand">Anonymous Message App</h1>
    </nav>
  );
};

export default Header;
