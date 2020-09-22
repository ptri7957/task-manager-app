import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

const Navbar = ({ auth, logout }) => {
  const linkStyle = {
    textDecoration: "none",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    color: "black",
    display: "block",
    transition: "0.3s",
    textAlign: "left",
  };

  const [sidebarStyle, setSidebarStyle] = useState({
    position: "fixed",
    textAlign: "center",
    backgroundColor: "white",
    height: "100vh",
    width: "0",
    top: "0",
    left: "0",
    zIndex: "1",
    overflowX: "hidden",
    transition: "0.2s",
  });

  const onClick = (e) => {
    if (sidebarStyle.width === "0") {
      setSidebarStyle({
        ...sidebarStyle,
        width: "300px",
      });
    } else {
      setSidebarStyle({
        ...sidebarStyle,
        width: "0",
      });
    }
  };

  const handleLogOut = e => {
      onClick(e);
      logout();
  }

  return (
    auth.isAuthenticated && (
      <Fragment>
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-header">
            <button
              className="btn btn-light"
              style={{ float: "left" }}
              onClick={(e) => onClick(e)}
            >
              ☰
            </button>
            <div className="navbar-brand">
              <strong>LOGGER</strong>
            </div>
          </div>
          <div id="sidebar" className="sidebar" style={sidebarStyle}>
            <div className="sidebar-heading">
              <button
                className="btn btn-close"
                style={{ position: "absolute", top: "0", left: "0" }}
                onClick={(e) => onClick(e)}
              >
                ☰
              </button>
              <h3>
                <strong>WELCOME</strong>
              </h3>
              {!auth.loading && auth.user !== null && (
                <Fragment>
                  <div className="row profile-info">
                    <div className="col-md-4">
                      <div className="profile-pic">
                        {auth.user.username[0].toUpperCase()}
                      </div>
                    </div>
                    <div className="col-md-8 name">{auth.user.username}</div>
                  </div>
                </Fragment>
              )}
            </div>
            <Link to="/addlist" style={linkStyle} onClick={(e) => onClick(e)}>
              ADD LIST
            </Link>
            <a href="#!" style={linkStyle} onClick={(e) => handleLogOut(e)}>LOGOUT</a>
          </div>
        </nav>
      </Fragment>
    )
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
