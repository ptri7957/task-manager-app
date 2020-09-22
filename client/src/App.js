import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import store from "./store";
import { Provider } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";

import setAuthToken from "./auth/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import AddListForm from "./components/AddListForm";
import Navbar from "./components/Navbar";
import DashboardPage from "./components/DashboardPage";
import AddTaskForm from "./components/AddTaskForm";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(
      loadUser()
    );
  });

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/addlist" component={AddListForm} />
          <PrivateRoute exact path="/:list_id/addtask" component={AddTaskForm} />
          <PrivateRoute exact path="/dashboard/:list_id" component={DashboardPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
