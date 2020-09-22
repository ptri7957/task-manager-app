import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { loginUser } from "../actions/auth";
import { connect } from 'react-redux'
import Alert from "./Alert";

const Login = ({loginUser, auth}) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if(auth.isAuthenticated){
    return <Redirect to="/dashboard" />
  }

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <div className="auth-container">
      <div className="card mt-100 mb-100">
        <div className="card-body">
          <h2>Login</h2>
          <Alert />
          <form onSubmit={(e) => onSubmit(e)}>
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
              Log In
            </button>
          </form>
          <div className="register-message">
            <p>
              Not a member? <Link to="/register">Sign up now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {loginUser})(Login);
