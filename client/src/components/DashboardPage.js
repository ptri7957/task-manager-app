import React, { useEffect, Fragment } from "react";
import { getTasksByList, deleteTask } from "../actions/tasks";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DashboardPage = ({
  getTasksByList,
  deleteTask,
  tasks,
  match,
}) => {
  useEffect(() => {
    getTasksByList(match.params.list_id);
  }, [getTasksByList, match]);

  return (
    <Fragment>
      <Link to="/dashboard">
        <button className="btn btn-submit">Back to Dashboard</button>
      </Link>
      <br />
      <div className="container mt-100 mb-100">
        <div className="card dashboard-card">
          <div className="card-body dashboard">
            <div className="page-wrapper">
              <h3>
                <strong>TASKS</strong>
              </h3>
              <Link to={`/${match.params.list_id}/addtask`}>
                <button className="btn btn-light">
                  <span className="fas fa-clipboard"></span>
                </button>
              </Link>
            </div>
            {!tasks.loading &&
              tasks.tasks.length > 0 &&
              tasks.tasks.map((task) => {
                return (
                  <div className="card">
                    <div className="card-body task-container">
                      <div className="item">
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                      </div>
                      <div className="task-btns">
                        <button
                          className="btn btn-light"
                          onClick={(e) =>
                            deleteTask(match.params.list_id, task._id)
                          }
                        >
                          <span className="fas fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

DashboardPage.propTypes = {
  getTasksByList: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps, {
  getTasksByList,
  deleteTask,
})(DashboardPage);
