import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "../actions/auth";
import { connect } from "react-redux";
import Alert from "./Alert";

const Register = ({ registerUser, auth }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  if(auth.isAuthenticated){
    return <Redirect to="/dashboard" />
  }

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(username, email, password);
  };

  return (
    <div className="auth-container">
      <div className="card mt-100 mb-100">
        <div className="card-body">
          <h2>Register</h2>
          <Alert />
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Type in your username"
                onChange={(e) => onChange(e)}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Type in your email"
                onChange={(e) => onChange(e)}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Type in your password"
                onChange={(e) => onChange(e)}
                value={password}
              />
            </div>
            <button className="btn btn-submit submit" type="submit">
              Sign Up
            </button>
          </form>
          <div className="register-message">
            <p>
              Already a member? <Link to="/login">Sign in now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(Register);
